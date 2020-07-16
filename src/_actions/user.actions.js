import { userService } from "../_services";
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
    const user = await userService.login(email, password);
    dispatch(userLoginSuccess(user));
    redirectToPage();
    dispatch(alertClear());
  } catch (error) {
    dispatch(userLoginFailure(error));
    dispatch(alertError(error));
  }
};

const logout = () => (dispatch) => {
  userService.logout();
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
