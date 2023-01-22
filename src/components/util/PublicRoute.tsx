import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface Props {
  children: JSX.Element;
}
const PublicRoute = ({ children }: Props) => {
  const isLoggedIn = useAuth(false);
  return isLoggedIn ? <Navigate to="/" /> : children;
};

export default PublicRoute;
