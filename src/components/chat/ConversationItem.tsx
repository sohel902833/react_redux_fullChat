import { useSelector } from "react-redux";
import { IAuth } from "../../feature/auth/authSlice";
import { IConversation } from "../../feature/chat/chat.types";
import { useNavigate } from "react-router-dom";
interface Props {
  avatar: string;
  conversation: IConversation;
}

const ConversationItem = ({ avatar, conversation }: Props) => {
  const { user } = useSelector((state: { auth: IAuth }) => state.auth);
  const navigate = useNavigate();
  const allParticipent = conversation?.participents?.filter(
    (item) => item?._id !== user?._id
  );

  const getName = () => {
    if (conversation?.groupChat) {
      return conversation?.groupName?.substring(0, 23);
    }
    return `${allParticipent[0]?.firstName} ${allParticipent[0]?.lastName}`.substring(
      0,
      23
    );
  };

  const getEmail = () => {
    if (conversation?.groupChat) {
      return `Participents: ` + conversation?.participents?.length;
    }
    return allParticipent[0]?.email?.substring(0, 20);
  };

  const openConversation = () => {
    navigate(`/${conversation?._id}`);
  };

  const isActive = () => {
    let active: boolean = false;
    allParticipent?.forEach((participent) => {
      if (participent?.online) {
        active = true;
      }
    });
    return active;
  };

  return (
    <div
      onClick={openConversation}
      className="flex items-center justify-between  transition-[1s] cursor-pointer  hover:bg-slate-700 p-2"
    >
      <div className="flex items-center gap-2">
        <div className="sm:w-[60px] sm:h-[60px] w-[60px] h-[60px] relative">
          <img
            className="h-full w-full object-cover rounded-full"
            src={avatar}
            alt=""
          />
          {isActive() && (
            <div className="absolute w-[10px] h-[10px] bg-green-800 rounded-full bottom-0 right-1"></div>
          )}
        </div>
        <div></div>
        <div className="sm:hidden md:block">
          <h2 className="text-white text-sm">{getName()}</h2>
          <p className="text-slate-500 text-xs">
            {conversation?.lastMessage
              ? conversation?.lastMessage?.text?.substring(0, 20)
              : getEmail()}
          </p>
        </div>
      </div>
      <div className="sm:hidden md:block">
        {conversation?.unreadCount > 0 ? (
          <div className="bg-red-500 text-white h-[20px] w-[20px] flex items-center justify-center rounded-full p-3">
            {conversation?.unreadCount}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;
