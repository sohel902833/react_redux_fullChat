import { useEffect, useRef } from "react";
import { IMessage } from "../../feature/chat/chat.types";
import { useGetMessagesQuery } from "../../feature/chat/chatApi";
import EmptyMessage from "./EmptyMessage";
import MessageItem from "./MessageItem";

interface Props {
  conversationId: string;
  setRepliedMessage: (message: IMessage) => void;
}
const MessageList = ({ conversationId, setRepliedMessage }: Props) => {
  const { data, isLoading } = useGetMessagesQuery(conversationId);
  const messageEndRef = useRef<HTMLDivElement>(null);
  let content = null;

  useEffect(() => {
    if (messageEndRef?.current)
      messageEndRef.current.scrollIntoView({ behavior: "auto" });
  }, [messageEndRef, data]);

  if (isLoading) {
    content = <EmptyMessage message="Loading Messages..." />;
  } else if (!isLoading && data?.messages?.length === 0) {
    content = <EmptyMessage />;
  } else if (!isLoading && data?.messages && data?.messages?.length > 0) {
    content = (
      <div className="flex-[10] flex-col gap-4 p-3 overflow-auto">
        {data?.messages.map((item, index) => (
          <MessageItem
            key={item?._id}
            message={item}
            setRepliedMessage={setRepliedMessage}
          />
        ))}
        <div ref={messageEndRef} className="messageEnd mb-5"></div>
      </div>
    );
  } else if (!isLoading && !data?.messages && data?.message) {
    content = <EmptyMessage message={data?.message} />;
  }

  return <>{content}</>;
};

export default MessageList;
