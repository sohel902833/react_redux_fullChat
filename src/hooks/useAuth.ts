import { useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "../feature/auth/authApi";
import { IAuth } from "../feature/auth/authSlice";
const useAuth = (isPrivate: boolean) => {
  const { data, isLoading } = useGetCurrentUserQuery("");
  const { user } = useSelector((state: { auth: IAuth }) => state.auth);
  if (!isLoading && (user?._id || data?._id)) {
    return true;
  } else if (!isLoading && !user?._id) {
    return false;
  } else {
    return isPrivate ? true : false;
  }
};

export default useAuth;
