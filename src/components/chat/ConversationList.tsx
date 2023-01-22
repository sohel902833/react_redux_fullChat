import { useGetConversationQuery } from "../../feature/chat/chatApi";
import ConversationItem from "./ConversationItem";
import {} from "../../";
const avatar =
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60";

const ConversationList = () => {
  const { data, isLoading } = useGetConversationQuery();

  let content = null;

  if (isLoading) {
    content = <div>Loading..</div>;
  }
  if (!isLoading && data?.conversations?.length === 0) {
    content = <div>No Conversation Found.</div>;
  }
  if (!isLoading && data?.conversations && data?.conversations?.length > 0) {
    content = data?.conversations?.map((conv) => (
      <ConversationItem conversation={conv} avatar={avatar} key={conv?._id} />
    ));
  }
  return <>{content}</>;
};

export default ConversationList;
