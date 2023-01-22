import { useRef, useState } from "react";
import { BsFillReplyFill } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { useSelector } from "react-redux";
import { IAuth } from "../../feature/auth/authSlice";
import { IMessage } from "../../feature/chat/chat.types";
import useOutsideClick from "../../hooks/useOutsideClick";
import RemoveMessageModal from "../home/RemoveMessageModal";
const image = require("../../assets/images/flower.jpeg");
interface Props {
  message: IMessage;
}
const imageLength = 4;
const MessageItem = ({ message }: Props) => {
  const { user } = useSelector((state: { auth: IAuth }) => state.auth);
  const [deleteMessageOpen, setDeleteMessageOpen] = useState(false);
  const optionMenuRef = useRef<null | HTMLButtonElement>(null);
  const { open: openOption, handleOpen: handleOptionOpen } =
    useOutsideClick(optionMenuRef);

  const me = user?._id === message?.sender?._id;
  const date = new Date(message?.createdAt);

  const handleRemoveMessage = () => {
    setDeleteMessageOpen(true);
  };

  return (
    <div className={`flex gap-2 ${me && "flex-row-reverse"}`}>
      <div
        className={`mt-6 my-2 flex flex-col max-w-[70%] ${
          me ? "items-end" : "items-start"
        }`}
      >
        <div className={`flex flex-col ${me ? "items-end" : "items-start"}`}>
          {/* <p className="text-white bg-slate-700 p-4 max-w-[80%] mb-[-10px] rounded-t-md">
            Reply Message
          </p> */}
          <p
            className={`${
              message?.unsent
                ? "text-white bg-red-500 px-4 py-2 rounded-md"
                : "text-white bg-orange-500 px-4 py-2 rounded-md"
            }`}
          >
            {message?.unsent ? "Unsent" : message?.text}
          </p>
        </div>
        {/* print image grid here  */}

        {/* <div className={`mt-2 grid gap-2 grid-cols-${imageLength>3?'3':imageLength.toString()}`}>
          {
          [...new Array(imageLength)].map((item,index)=>(
            <div> <img key={index} src={image} alt=""/></div>
          ))
        }
        </div> */}
        <p className="text-white font-semibold mt-3 text-sm">
          {date?.toLocaleDateString()} At {date?.toLocaleTimeString()}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className="bg-slate-500 p-2 rounded-full hover:bg-slate-600 ">
          <BsFillReplyFill color="white" size={20} />
        </button>
        <button
          ref={optionMenuRef}
          className="bg-slate-500 p-2 rounded-full  hover:bg-slate-600 relative transition-all"
          onClick={handleOptionOpen}
        >
          <SlOptionsVertical color="white" size={20} />
          {openOption && (
            <div className="transition-all bg-slate-500 p-1 min-w-[120px] rounded-sm absolute top-10 right-3">
              <ul>
                <li
                  onClick={handleRemoveMessage}
                  className="hover:bg-slate-400 py-2 px-1"
                >
                  Remove
                </li>
                <li className="hover:bg-slate-400 py-2 px-1">World</li>
              </ul>
            </div>
          )}
        </button>
      </div>
      <RemoveMessageModal
        messageId={message?._id}
        open={deleteMessageOpen}
        setOpen={setDeleteMessageOpen}
        isSenderLoggedIn={me}
      />
    </div>
  );
};

export default MessageItem;
