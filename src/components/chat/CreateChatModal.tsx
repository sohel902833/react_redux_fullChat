import Modal from "../util/Modal";
import { useSelector } from "react-redux";
import { IUserSlice } from "../../feature/user/userSlice";
import { useState, useEffect } from "react";
import { useGetUsersQuery } from "../../feature/user/userApi";
import ChatUserItem from "./ChatUserItem";
import { useOnScreen } from "../../hooks/useVisibleOnScreen";
import { IUser } from "../../feature/auth/auth.types";
import { toast } from "react-toastify";
import ChatSelectedUserItem from "./ChatSelectedUserItem";
import { useCreateConversationMutation } from "../../feature/chat/chatApi";
import TextInput from "../util/TextInput";

const image = require("../../assets/images/flower.jpeg");

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  groupChat?: boolean;
}
const CreateChatModal = ({ open, setOpen, groupChat = false }: Props) => {
  const { data, next } = useSelector(
    (state: { users: IUserSlice }) => state.users
  );
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<IUser[]>([]);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const { isLoading } = useGetUsersQuery(
    { limit: 5, page },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [createConversation, { isLoading: createConversationLoading }] =
    useCreateConversationMutation();
  const [lastUserRef, isVisible] = useOnScreen({});
  const [loader, setLoader] = useState(isLoading);
  useEffect(() => {
    if (!isLoading && next?.page) {
      setPage(next.page);
      setLoader(true);
    }
  }, [isVisible, isLoading]);
  useEffect(() => {
    if (data) {
      setLoader(false);
    }
  }, [data]);

  const handleSelectUser = (user: IUser) => {
    const previousUser = selectedUser?.filter(
      (userItem) => userItem?._id === user?._id
    );
    if (previousUser?.length > 0) {
      toast.warn("User Already Selected.");
      return;
    }
    if (!groupChat && selectedUser?.length > 0) {
      toast.warn("Maximum 1 User For Individual Chat.");
      return;
    }
    setSelectedUser((prevUsers) => [...prevUsers, { ...user }]);
    setError("");
  };

  const handleRemoveUser = (user: IUser) => {
    const newUserList = selectedUser?.filter(
      (userItem) => userItem?._id !== user?._id
    );
    setSelectedUser(newUserList);
    setError("");
  };

  const filterUser = (user: IUser) => {
    if (search) {
      if (
        user?.email?.toLowerCase().includes(search.toLowerCase()) ||
        user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        user?.lastName?.toLowerCase().includes(search.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    if (selectedUser?.length > 0) {
      if (groupChat && !groupName) {
        toast.error("Please Enter Group Name!");
        return;
      }
      if (groupChat && selectedUser?.length < 3) {
        toast.error("Minimum 2 user required for group chat.");
        return;
      }
      const body = {
        participents: selectedUser?.map((item) => item?._id),
        groupName: groupName,
      };
      const response: any = await createConversation(body);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setSelectedUser([]);
        setSearch("");
        setError("");
        setOpen(false);
      } else {
        toast.error(response?.data?.message);
      }
    } else {
      toast.error("No User Found For Create Conversation.");
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex flex-col w-full">
        <h2 className="mb-4 mt-2 text-white font-extrabold text-2xl">
          Create New {groupChat ? "Group" : "Chat"}
        </h2>
        <input
          className={`w-full py-4 outline-none bg-transparent text-white font-semibold
                    border-2 border-slate-400 px-4 rounded-lg`}
          type="search"
          placeholder="Search User By Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {groupChat && (
          <>
            <br />
            <TextInput
              type="text"
              placeholder="Group Name"
              label="Group Name"
              required={true}
              value={groupName}
              onChange={(e: any) => setGroupName(e.target.value)}
              error={""}
            />
          </>
        )}

        <div className="flex gap-2 mt-3 flex-wrap ">
          {selectedUser?.length > 0 &&
            selectedUser.map((user, index) => (
              <ChatSelectedUserItem
                key={user?._id}
                user={user}
                handleRemoveUser={handleRemoveUser}
              />
            ))}
        </div>
        {/* user list  */}
        <h2 className="mb-2 mt-4 text-white font-extrabold text-xl">
          Select Users
        </h2>
        <div className="flex flex-col gap-3 mt-5 mx-h-[60%] overflow-y-auto">
          {data &&
            data.filter(filterUser).map((user, index) => {
              return (
                <ChatUserItem
                  key={user?._id}
                  user={user}
                  ref={lastUserRef}
                  handleSelectUser={handleSelectUser}
                />
              );
            })}
          {loader && (
            <div className="text-green-500 mt-1">Loading Users...</div>
          )}
        </div>

        {/* action button  */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setOpen(false)}
            className="bg-red-600 px-7 py-3 rounded-sm text-slate-50 font-extrabold hover:bg-red-500"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 px-7 py-3 rounded-sm text-slate-50 font-extrabold hover:bg-green-500"
          >
            {createConversationLoading ? "Creating.." : "Create Chat"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateChatModal;
