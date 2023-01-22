import * as React from "react";
import { Outlet, useParams } from "react-router-dom";
import ChatProfile from "../../components/chat/ChatProfile";
import ConversationList from "../../components/chat/ConversationList";
import CreateChatModal from "../../components/chat/CreateChatModal";
import EmptyConversation from "../../components/chat/EmptyConversation";
import DeleteConversationModal from "../../components/home/DeleteConversationModal";
import LogoutModal from "../../components/home/LogoutModal";
import "./chat.css";

const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
const Home = () => {
  const [createChatModal, setCreateChatModal] = React.useState<boolean>(false);
  const [createGroupModal, setCreateGroupModal] =
    React.useState<boolean>(false);
  const { conversationId } = useParams();
  return (
    <>
      <section className="bg-slate-900 h-screen flex gap-1">
        {/* conversation list */}
        <div className="h-full flex-[1] overflow-y-auto overflow-x-hidden flex flex-col gap-3 p-3 ">
          {/* profile section  */}

          <ChatProfile
            setCreateChatModal={setCreateChatModal}
            setCreateGroupModal={setCreateGroupModal}
          />

          <ConversationList />
        </div>

        {/* messages */}
        {!conversationId && <EmptyConversation />}
        <Outlet />
      </section>
      <CreateChatModal open={createChatModal} setOpen={setCreateChatModal} />
      <CreateChatModal
        open={createGroupModal}
        setOpen={setCreateGroupModal}
        groupChat={true}
      />
      <LogoutModal />
      <DeleteConversationModal />
    </>
  );
};

export default Home;
