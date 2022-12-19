import { httpService, setCommonHeader } from "./httpService";
import jwtDecode from "jwt-decode";

export function createUser(user) {
  return httpService.post("/users", user);
}
const TOKEN_KEY = "token";
setTokenHeader();

function getJwt() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setTokenHeader() {
  setCommonHeader("x-auth-token", getJwt());
}

export async function logIn(user) {
  const { data } = await httpService.post("/auth", user);
  localStorage.setItem(TOKEN_KEY, data.token);
  setTokenHeader();
}
export function logOut() {
  localStorage.removeItem(TOKEN_KEY);
  setTokenHeader();
}

export function getUser() {
  const token = getJwt();
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export const userService = {
  createUser,
  logIn,
  logOut,
  getJwt,
  getUser,
  setTokenHeader,
};
