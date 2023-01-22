import Modal from "../util/Modal";
import { useDispatch } from "react-redux";
import {
  useMessageDeleteForMeMutation,
  useUnsentMessageMutation,
} from "../../feature/chat/chatApi";
interface Props {
  messageId: string;
  open: boolean;
  isSenderLoggedIn: boolean;
  setOpen: (open: boolean) => void;
}

const RemoveMessageModal = ({
  messageId,
  open,
  setOpen,
  isSenderLoggedIn,
}: Props) => {
  const [removeForMe, { isLoading }] = useMessageDeleteForMeMutation();
  const [unsentMessage, { isLoading: unsentLoading }] =
    useUnsentMessageMutation();
  const dispatch = useDispatch();
  const handleRemoveForMe = async () => {
    const res: any = await removeForMe(messageId);
    setOpen(false);
  };
  const handleUnsent = async () => {
    const res: any = await unsentMessage(messageId);
    setOpen(false);
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex flex-col w-full">
        <h2 className="mb-4 mt-2 text-white font-extrabold text-2xl">
          Delete Conversation
        </h2>
        <h2 className="mb-4 mt-2 text-white font-bold text-md">
          Are You Sure You Want To Delete This Conversation?
        </h2>

        {/* action button  */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setOpen(false)}
            className="bg-red-600 px-7 py-3 rounded-sm text-slate-50 font-extrabold hover:bg-red-500"
          >
            Close
          </button>
          <button
            onClick={handleRemoveForMe}
            className="bg-green-600 px-7 py-3 rounded-sm text-slate-50 font-extrabold hover:bg-green-500"
          >
            {isLoading ? "Removing.." : "Remove For Me"}
          </button>
          {isSenderLoggedIn && (
            <button
              onClick={handleUnsent}
              className="bg-green-600 px-7 py-3 rounded-sm text-slate-50 font-extrabold hover:bg-green-500"
            >
              {unsentLoading ? "Removing.." : "Unsend"}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RemoveMessageModal;
