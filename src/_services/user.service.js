import { requestUrl } from "../_constants";
import { handleResponse } from "./common.service";

function logout() {
  localStorage.removeItem("user");
}

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { email: email.toLowerCase(), password } }),
  };
  return fetch(requestUrl.login, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user }),
    redirect: "follow",
  };
  return fetch(requestUrl.register, requestOptions).then(handleResponse);
}

export const userService = {
  login,
  logout,
  register,
};
