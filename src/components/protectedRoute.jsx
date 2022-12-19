import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContextProvider";

const ProtectedRoute = ({ children, onlyBiz = false }) => {
  const { user } = useAuth();
  if (!user || (onlyBiz && !user.biz)) {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoute;
