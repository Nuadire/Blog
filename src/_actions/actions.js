import { createAction } from "redux-actions";

export const userRegisterRequest = createAction("USERS_REGISTER_REQUEST");
export const userRegisterSuccess = createAction("USERS_REGISTER_SUCCESS");
export const userRegisterFailure = createAction("USERS_REGISTER_FAILURE");
export const userLoginRequest = createAction("USERS_LOGIN_REQUEST");
export const userLoginSuccess = createAction("USERS_LOGIN_SUCCESS");
export const userLoginFailure = createAction("USERS_LOGIN_FAILURE");
export const userLogout = createAction("USERS_LOGOUT");
export const alertSuccess = createAction("ALERT_SUCCESS");
export const alertError = createAction("ALERT_ERROR");
export const alertClear = createAction("ALERT_CLEAR");