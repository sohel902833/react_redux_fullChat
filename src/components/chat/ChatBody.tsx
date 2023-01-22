import { current } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { apiSlice } from "../../feature/api/apiSlice";
import { IAuth } from "../../feature/auth/authSlice";
import { IConversationResponse } from "../../feature/chat/chat.types";
import { useGetSingleConversationQuery } from "../../feature/chat/chatApi";
import { setActiveConversation } from "../../feature/container/containerSlice";
import ChatHead from "./ChatHead";
import ChatInput from "./ChatInput";
import EmptyConversation from "./EmptyConversation";
import MessageList from "./MessageList";

const ChatBody = () => {
  const { conversationId } = useParams();
  const { user } = useSelector((state: { auth: IAuth }) => state.auth);
  const { data, isLoading } = useGetSingleConversationQuery(
    conversationId as string
  );
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(setActiveConversation(conversationId ? conversationId : ""));
    // dispatch(
    //   apiSlice.util.updateQueryData(
    //     "getConversations" as never,
    //     undefined as never,
    //     (draft: IConversationResponse) => {
    //       draft.conversations = [...draft.conversations];
    //       console.log(current(draft));
    //     }
    //   )
    // );
  }, [conversationId]);

  let content = null;

  if (isLoading) {
    content = <EmptyConversation message={"Loading..."} />;
  }
  if (!isLoading && data?.notFound) {
    content = <EmptyConversation message={data?.message} />;
  }
  if (!isLoading && data?.conversation?._id) {
    const participent = data?.conversation?.participents?.filter(
      (item) => item?._id !== user?._id
    )[0];
    content = (
      <>
        <div className="flex-[1] p-4 border-b-2 border-slate-600 shadow-sm flex justify-between items-center">
          <ChatHead participent={participent} />
        </div>
        <MessageList conversationId={conversationId as string} />
        {/* text input  */}
        <ChatInput conversationId={conversationId as string} />
      </>
    );
  }
  return (
    <div className="flex flex-col h-full flex-[5]  border-l-2 border-slate-600 shadow-sm">
      {/* header */}
      {content}
    </div>
  );
};

export default ChatBody;
