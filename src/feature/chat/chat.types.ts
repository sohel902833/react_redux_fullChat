import { IAttatchment } from "../attatchment/attatchment.types";
import { IUser } from "../auth/auth.types";

export interface IConversationResponse {
  conversations: IConversation[];
}

export interface IConversation {
  _id: string;
  groupChat: boolean;
  participents: IUser[];
  groupName: string;
  timestamp: number;
  createdAt: string;
  updatedAt: string;
  unreadCount: number;
  lastMessage: ILastMessage | null;
}

export interface ILastMessage {
  _id: string;
  conversationId: string;
  text: string;
  unreadFor: string[];
  sender: string;
  images: IAttatchment[];
  createdAt: string;
  updatedAt: string;
}

export interface ISingleConversationResponse {
  message: string;
  success: boolean;
  notFound?: boolean;
  conversation?: {
    _id: string;
    groupChat: boolean;
    participents: IUser[];
    groupName: string;
    timestamp: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IMessageResponse {
  messages: IMessage[];
  message?: string;
}

export interface IMessage {
  _id: string;
  conversationId: string;
  text: string;
  authors: string[];
  unreadFor: string[];
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  unsent: boolean;
  timestamp: string;
  images: IAttatchment[];
  createdAt: string;
  updatedAt: string;
}

export interface ISentMessageSocket {
  receivers: string[];
  meta: IMessage;
}
export interface IDeleteConversationResponse {
  message: string;
  success: boolean;
}

export interface IDeleteConversationSocketRes {
  receivers: string;
  meta: {
    conversationId: string;
  };
}
export interface IRemoveMessageForMeSocketRes {
  receivers: string;
  meta: {
    messageId: string;
    conversationId: string;
  };
}
export interface IUnsentMessageSocketRes {
  receivers: string[];
  meta: {
    messageId: string;
    conversationId: string;
  };
}
