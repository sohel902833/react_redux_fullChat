import { useSelector } from "react-redux";
import { IAuth } from "../../feature/auth/authSlice";

const avatar =
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60";
interface Props {
  setCreateChatModal: (open: boolean) => void;
  setCreateGroupModal: (open: boolean) => void;
}
const ChatProfile = ({ setCreateChatModal, setCreateGroupModal }: Props) => {
  const { user } = useSelector((state: { auth: IAuth }) => state.auth);

  return (
    <div className="p-4 flex gap-3">
      <div className="w-[120px] h-[120px] relative">
        <img className="h-full w-full rounded-sm" src={avatar} alt="" />
        {user?.online && (
          <div className="absolute w-[15px] h-[15px] bg-green-800 rounded-full right-1 top-1"></div>
        )}
      </div>
      <div className="flex flex-col justify-start gap-2">
        <h2 className="text-blue-500 text-lg font-extrabold">
          {user?.firstName} {user?.lastName}
        </h2>
        <button
          onClick={() => setCreateChatModal(true)}
          className="bg-slate-700 max-w-[120px] rounded-sm px-2 py-1 hover:bg-slate-500 text-white"
        >
          New Chat
        </button>
        <button
          onClick={() => setCreateGroupModal(true)}
          className="bg-blue-700 max-w-[120px] rounded-sm px-2 py-1 hover:bg-blue-500 text-white"
        >
          New Group
        </button>
      </div>
    </div>
  );
};

export default ChatProfile;
