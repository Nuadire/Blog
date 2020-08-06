import { setToken, userService } from "../_services";
import {
  alertSuccess,
  alertError,
  alertClear,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFailure,
  userLogout,
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
} from "./actions";

const login = (email, password, redirectToPage) => async (dispatch) => {
  dispatch(userLoginRequest());
  try {
    const response = await userService.login(email, password);
    setToken(response.user.token);
    dispatch(userLoginSuccess(response));
    redirectToPage();
    dispatch(alertClear());
  } catch (error) {
    dispatch(userLoginFailure(error));
    dispatch(alertError(error));
  }
};

const logout = (redirectToPage = ()=>{}) => (dispatch) => {
  setToken(null);
  userService.logout();
  redirectToPage();
  dispatch(userLogout());
  dispatch(alertClear());


};

const register = (user, redirectToPage) => async (dispatch) => {
  dispatch(userRegisterRequest(user));
  try {
    await userService.register(user);
    dispatch(userRegisterSuccess());
    redirectToPage();
    dispatch(alertSuccess("Registration successful"));
  } catch (error) {
    dispatch(userRegisterFailure(error));
    dispatch(alertError(error));
  }
};

export const userActions = {
  login,
  logout,
  register,
};
