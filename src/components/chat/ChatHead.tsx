import { useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { IUser } from "../../feature/auth/auth.types";
import {
  handleLogoutModal,
  setDeleteConversationModal,
} from "../../feature/container/containerSlice";
import useOutsideClick from "../../hooks/useOutsideClick";

const avatar =
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60";
interface Props {
  participent: IUser;
}
const ChatHead = ({ participent }: Props) => {
  const profileOptionRef = useRef<null | HTMLButtonElement>(null);
  const { open: profileOptionOpen, handleOpen: handleProfileOptionOpen } =
    useOutsideClick(profileOptionRef);
  const dispatch = useDispatch();
  const handleLogoutOpen = (open: boolean) => {
    dispatch(handleLogoutModal(open));
  };
  const handleDeleteConversationOpen = (open: boolean) => {
    dispatch(setDeleteConversationModal(open));
  };
  return (
    <>
      <div className="flex gap-4">
        <div className="w-[60px] h-[60px] relative">
          <img
            className="h-full w-full object-cover rounded-full"
            src={avatar}
            alt=""
          />
          <div className="absolute w-[10px] h-[10px] bg-green-800 rounded-full bottom-0 right-1"></div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-slate-300 font-semibold ">
            {participent?.firstName} {participent?.lastName}
          </h3>
          <p className="text-white">{participent?.email}</p>
        </div>
      </div>
      <div>
        <button
          ref={profileOptionRef}
          className="bg-slate-500 p-2 rounded-full  hover:bg-slate-600 relative transition-all"
          onClick={handleProfileOptionOpen}
        >
          <CgProfile color="white" size={40} />
          {profileOptionOpen && (
            <div className="transition-all bg-slate-500 p-1 min-w-[180px] rounded-sm absolute top-10 right-3">
              <ul>
                <li
                  onClick={() => handleDeleteConversationOpen(true)}
                  className="hover:bg-slate-400 py-2 px-1"
                >
                  Delete Conversation
                </li>
                <li
                  className="bg-red-500 hover:bg-slate-400 py-2 px-1"
                  onClick={() => handleLogoutOpen(true)}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </button>
      </div>
    </>
  );
};

export default ChatHead;
