import Modal from "../util/Modal";
import { useDispatch, useSelector } from "react-redux";
import { IContainer } from "../../feature/container/container.types";
import { setDeleteConversationModal } from "../../feature/container/containerSlice";
import { useDeleteConversationMutation } from "../../feature/chat/chatApi";
import { toast } from "react-toastify";

const DeleteConversationModal = () => {
  const [deleteConversation, { isLoading }] = useDeleteConversationMutation();
  const { deleteConversationModal, activeConversation } = useSelector(
    (state: { container: IContainer }) => state.container
  );
  const dispatch = useDispatch();

  const handleOpen = (open: boolean) => {
    dispatch(setDeleteConversationModal(open));
  };

  const handleDeleteConversation = async () => {
    const res: any = await deleteConversation(activeConversation);
    if (res?.data?.success) {
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
    dispatch(setDeleteConversationModal(false));
  };

  return (
    <Modal open={deleteConversationModal} setOpen={handleOpen}>
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
            onClick={() => handleOpen(false)}
            className="bg-red-600 px-7 py-3 rounded-sm text-slate-50 font-extrabold hover:bg-red-500"
          >
            Close
          </button>
          <button
            onClick={handleDeleteConversation}
            className="bg-green-600 px-7 py-3 rounded-sm text-slate-50 font-extrabold hover:bg-green-500"
          >
            {isLoading ? "Deleting.." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConversationModal;
