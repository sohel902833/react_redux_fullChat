import { current } from "@reduxjs/toolkit";
import socket from "../../lib/socket.io";
import { SocketEvent } from "../../lib/socketEvents";
import { apiSlice } from "../api/apiSlice";
import { TagTypes } from "../api/tagTypes";
import { IAuth, setLoggedInUserOnlineStatus } from "../auth/authSlice";
import { IContainer } from "../container/container.types";
import { IUserStatusSocketRes } from "../user/user.types";
import { changeUserStatus } from "../user/userSlice";
import {
  IConversationResponse,
  IDeleteConversationResponse,
  IDeleteConversationSocketRes,
  ILastMessage,
  IMessageResponse,
  IRemoveMessageForMeSocketRes,
  ISentMessageSocket,
  ISingleConversationResponse,
  IUnsentMessageSocketRes,
} from "./chat.types";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createConversation: builder.mutation({
      query: (body) => ({
        url: `/conversation`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: (result, error, arg) => {
        return [TagTypes.CONVERSATIONS];
      },
    }),
    getConversation: builder.query<IConversationResponse, void>({
      query: () => ({
        url: `/conversation`,
        method: "GET",
      }),
      providesTags: [TagTypes.CONVERSATIONS],
      async onCacheEntryAdded(arg, { cacheDataLoaded, getState, dispatch }) {
        try {
          await cacheDataLoaded;
          socket.on(
            SocketEvent.UPDATE_ACTIVE_STATUS,
            (data: IUserStatusSocketRes) => {
              //update user list
              const payload = {
                userId: data?.userId,
                lastActive: data?.lastActive,
                online: data?.online,
              };
              dispatch(changeUserStatus(payload));
              dispatch(setLoggedInUserOnlineStatus(payload));
              //set conversation active

              dispatch(
                apiSlice.util.updateQueryData(
                  "getConversation" as never,
                  undefined as never,
                  (draft: IConversationResponse) => {
                    draft.conversations = draft.conversations.map(
                      (conversation) => {
                        const newConversationParticipent =
                          conversation?.participents?.map((participent) => {
                            if (participent?._id === data?.userId) {
                              return {
                                ...participent,
                                online: data?.online,
                                lastActive: data?.lastActive,
                              };
                            }
                            return participent;
                          });
                        return {
                          ...conversation,
                          participents: newConversationParticipent,
                        };
                      }
                    );
                  }
                )
              );
            }
          );
        } catch (err) {}
      },
    }),
    getSingleConversation: builder.query<ISingleConversationResponse, string>({
      query: (id) => ({
        url: `/conversation/${id}`,
        method: "GET",
      }),

      async onQueryStarted(arg, { dispatch, getState }) {
        //optimistic cache update start to the conversation cache
        const state = getState() as any;
        const { activeConversation } = state?.container as IContainer;
        const pathResult1 = dispatch(
          apiSlice.util.updateQueryData(
            "getConversation" as never,
            undefined as never,
            (draft: IConversationResponse) => {
              draft.conversations = draft.conversations.map((conversation) => {
                if (conversation?._id === activeConversation) {
                  return {
                    ...conversation,
                    unreadCount: 0,
                  };
                }

                return conversation;
              });
            }
          )
        );
      },
    }),
    sendMessage: builder.mutation<void, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/conversation/send-message/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    getMessages: builder.query<IMessageResponse, string>({
      query: (id) => ({
        url: `/conversation/message/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: TagTypes.MESSAGES, id: id },
      ],
      async onCacheEntryAdded(arg, { cacheDataLoaded, getState, dispatch }) {
        try {
          await cacheDataLoaded;
          const state = getState() as any;
          const { user } = state?.auth as IAuth;
          const { activeConversation } = state?.container as IContainer;
          socket.on(SocketEvent.MESSAGE_SENT, (data: ISentMessageSocket) => {
            const { meta, receivers } = data;

            if (receivers?.includes(user?._id as string)) {
              dispatch(
                apiSlice.util.updateQueryData(
                  "getConversation" as never,
                  undefined as never,
                  (draft: IConversationResponse) => {
                    const lastMessage: ILastMessage = {
                      _id: meta?._id,
                      conversationId: meta?.conversationId,
                      createdAt: meta?.createdAt,
                      updatedAt: meta?.updatedAt,
                      images: meta?.images,
                      sender: meta?.sender?._id,
                      text: meta?.text,
                      unreadFor: meta?.unreadFor,
                    };

                    draft.conversations = draft.conversations.map(
                      (conversation) => {
                        if (conversation?._id === meta?.conversationId) {
                          let unreadCount = 0;
                          if (
                            meta?.conversationId !== activeConversation &&
                            meta?.sender?._id !== user?._id
                          ) {
                            unreadCount = conversation?.unreadCount + 1;
                          }
                          return {
                            ...conversation,
                            lastMessage: lastMessage,
                            unreadCount: unreadCount,
                          };
                        }
                        return conversation;
                      }
                    );
                  }
                )
              );
              dispatch(
                apiSlice.util.updateQueryData(
                  "getMessages" as never,
                  meta.conversationId as never,
                  (draft: IMessageResponse) => {
                    if (draft?.messages?.length > 0) {
                      draft.messages.push(meta);
                    } else {
                      draft.messages = [{ ...meta }];
                    }
                  }
                )
              );
            }
          });
          socket.on(
            SocketEvent.DELETE_CONVERSATION,
            (data: IDeleteConversationSocketRes) => {
              const { meta, receivers } = data;

              if (receivers === user?._id) {
                dispatch(
                  apiSlice.util.updateQueryData(
                    "getConversation" as never,
                    undefined as never,
                    (draft: IConversationResponse) => {
                      draft.conversations = draft.conversations.map(
                        (conversation) => {
                          if (conversation?._id === meta?.conversationId) {
                            return {
                              ...conversation,
                              lastMessage: null,
                              unreadCount: 0,
                            };
                          }
                          return conversation;
                        }
                      );
                    }
                  )
                );
                dispatch(
                  apiSlice.util.updateQueryData(
                    "getMessages" as never,
                    meta.conversationId as never,
                    (draft: IMessageResponse) => {
                      if (draft?.messages?.length > 0) {
                        draft.messages = [];
                      } else {
                        draft.messages = [];
                      }
                    }
                  )
                );
              }
            }
          );
          socket.on(
            SocketEvent.REMOVE_MESSAGE_FOR_ME,
            (data: IRemoveMessageForMeSocketRes) => {
              const { meta, receivers } = data;
              if (receivers === user?._id) {
                dispatch(
                  apiSlice.util.updateQueryData(
                    "getConversation" as never,
                    undefined as never,
                    (draft: IConversationResponse) => {
                      //findout last message
                      draft.conversations = draft.conversations.map(
                        (conversation) => {
                          if (
                            conversation?._id === meta?.conversationId &&
                            conversation?.lastMessage?._id === meta?.messageId
                          ) {
                            return {
                              ...conversation,
                              lastMessage: {
                                ...(conversation?.lastMessage as ILastMessage),
                                text: "Removed By You",
                              },
                              unreadCount: 0,
                            };
                          }
                          return conversation;
                        }
                      );
                    }
                  )
                );
                dispatch(
                  apiSlice.util.updateQueryData(
                    "getMessages" as never,
                    meta.conversationId as never,
                    (draft: IMessageResponse) => {
                      if (draft?.messages?.length > 0) {
                        draft.messages = draft.messages?.filter(
                          (msg) => msg?._id !== meta?.messageId
                        );
                      }
                    }
                  )
                );
              }
            }
          );
          socket.on(
            SocketEvent.UNSEND_MESSAGE,
            (data: IUnsentMessageSocketRes) => {
              const { meta, receivers } = data;
              if (receivers.includes(user?._id as string)) {
                dispatch(
                  apiSlice.util.updateQueryData(
                    "getConversation" as never,
                    undefined as never,
                    (draft: IConversationResponse) => {
                      //findout last message
                      draft.conversations = draft.conversations.map(
                        (conversation) => {
                          if (
                            conversation?._id === meta?.conversationId &&
                            conversation?.lastMessage?._id === meta?.messageId
                          ) {
                            return {
                              ...conversation,
                              lastMessage: {
                                ...(conversation?.lastMessage as ILastMessage),
                                text: "Removed",
                              },
                              unreadCount: 0,
                            };
                          }
                          return conversation;
                        }
                      );
                    }
                  )
                );
                dispatch(
                  apiSlice.util.updateQueryData(
                    "getMessages" as never,
                    meta.conversationId as never,
                    (draft: IMessageResponse) => {
                      if (draft?.messages?.length > 0) {
                        draft.messages = draft.messages?.map((msg) => {
                          if (msg?._id === meta?.messageId) {
                            return {
                              ...msg,
                              text: "Unsent",
                              images: [],
                              unsent: true,
                            };
                          }
                          return msg;
                        });
                      }
                    }
                  )
                );
              }
            }
          );
        } catch (err) {}
      },
    }),
    deleteConversation: builder.mutation<IDeleteConversationResponse, string>({
      query: (conversationId) => ({
        url: `/conversation/${conversationId}`,
        method: "PUT",
      }),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        //optimistic cache update start to the conversation cache
        const state = getState() as any;
        const { activeConversation } = state?.container as IContainer;
        const pathResult1 = dispatch(
          apiSlice.util.updateQueryData(
            "getMessages" as never,
            arg as never,
            (draft: IMessageResponse) => {
              console.log(current(draft));
              draft.message = "";
              draft.messages = [];
            }
          )
        );
        try {
          const res = await queryFulfilled;
        } catch (er) {
          pathResult1.undo();
        }
      },
    }),
    messageDeleteForMe: builder.mutation<IDeleteConversationResponse, string>({
      query: (messageId) => ({
        url: `/conversation/message/me/${messageId}`,
        method: "DELETE",
      }),
    }),
    unsentMessage: builder.mutation<IDeleteConversationResponse, string>({
      query: (messageId) => ({
        url: `/conversation/message/${messageId}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useCreateConversationMutation,
  useGetConversationQuery,
  useGetSingleConversationQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useDeleteConversationMutation,
  useMessageDeleteForMeMutation,
  useUnsentMessageMutation,
} = chatApi;
