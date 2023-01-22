import React, { LegacyRef } from "react";
import { IUser } from "../../feature/auth/auth.types";
const image = require("../../assets/images/flower.jpeg");

interface Props {
  user: IUser;
  handleSelectUser: (user: IUser) => void;
}
const ChatUserItem = React.forwardRef(
  ({ user, handleSelectUser }: Props, ref: LegacyRef<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        className="flex items-center justify-between gap-3  rounded-md bg-slate-500 p-3 shadow-sm"
      >
        <div className="flex items-center gap-3 ">
          <img
            className="w-[70px] h-[70px] object-cover rounded-full"
            src={image}
            alt=""
          />
          <div className="flex flex-col">
            <h2 className="text-white font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-white text-sm">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => handleSelectUser(user)}
          className="bg-green-600 px-7 py-3 rounded-sm text-slate-50 font-extrabold hover:bg-green-500"
        >
          Add
        </button>
      </div>
    );
  }
);

export default ChatUserItem;
