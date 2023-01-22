import Modal from "../util/Modal";
import { useDispatch, useSelector } from "react-redux";
import { IContainer } from "../../feature/container/container.types";
import { handleLogoutModal } from "../../feature/container/containerSlice";
import { userLoggedOut } from "../../feature/auth/authSlice";
import { useNavigate } from "react-router-dom";
const image = require("../../assets/images/flower.jpeg");

const LogoutModal = () => {
  const { logoutModal } = useSelector(
    (state: { container: IContainer }) => state.container
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpen = (open: boolean) => {
    dispatch(handleLogoutModal(open));
  };
  const logout = async () => {
    localStorage.removeItem("token");
    dispatch(userLoggedOut(undefined));
    dispatch(handleLogoutModal(false));
    navigate("/login");
  };

  return (
    <Modal open={logoutModal} setOpen={handleOpen}>
      <div className="flex flex-col w-full">
        <h2 className="mb-4 mt-2 text-white font-extrabold text-2xl">Logout</h2>
        <h2 className="mb-4 mt-2 text-white font-bold text-md">
          Are You Sure You Want To Logout?
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
            onClick={logout}
            className="bg-green-600 px-7 py-3 rounded-sm text-slate-50 font-extrabold hover:bg-green-500"
          >
            Logout
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
