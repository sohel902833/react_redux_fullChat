import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface Props {
  children: JSX.Element;
}
const PrivateRoute = ({ children }: Props) => {
  const isLoggedIn = useAuth(true);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
