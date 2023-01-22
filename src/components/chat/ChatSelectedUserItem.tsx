import React from "react";
import { IUser } from "../../feature/auth/auth.types";
import { MdClose } from "react-icons/md";

const image = require("../../assets/images/flower.jpeg");

interface Props {
  user: IUser;
  handleRemoveUser: (user: IUser) => void;
}
const ChatSelectedUserItem = ({ user, handleRemoveUser }: Props) => {
  return (
    <div className="flex gap-3 items-center grow  bg-slate-500 shadow-sm rounded-md p-4 basis-50 relative">
      <img
        className="w-[50px] h-[50px] object-cover rounded-full"
        src={image}
        alt=""
      />
      <div className="flex flex-col">
        <h2 className="text-white font-semibold">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="text-white text-sm">{user?.email}</p>
      </div>
      <button
        onClick={() => handleRemoveUser(user)}
        className="absolute top-0 right-0 bg-red-500 p-2 hover:bg-red-600 rounded-tr-md rounded-br-md"
      >
        <MdClose color="white" size={20} />
      </button>
    </div>
  );
};

export default ChatSelectedUserItem;
