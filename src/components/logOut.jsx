import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContextProvider";
export const LogOut = () => {
  const navigate = useNavigate();
  const { logOut, user } = useAuth();

  useEffect(() => {
    logOut();
    navigate("/SPA-realApp");
  }, []);
  toast("logged out");
};
export default LogOut;
