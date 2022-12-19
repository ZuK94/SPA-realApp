import { createContext, useContext, useState } from "react";
import { getUser, logIn, userService } from "../services/userService";

const authContext = createContext(null);
authContext.displayName = "auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const refreshUser = () => {
    setUser(getUser());
  };

  const loginUser = async (user) => {
    const response = await logIn(user);
    refreshUser();
    return response;
  };

  const logOut = () => {
    userService.logOut();
    refreshUser();
  };

  return (
    <authContext.Provider
      value={{
        user,
        loginUser,
        refreshUser,
        logOut,
        createUser: userService.createUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(authContext);
};
