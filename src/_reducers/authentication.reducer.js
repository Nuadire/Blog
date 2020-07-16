import { handleActions } from 'redux-actions';
import {
  userLoginSuccess,
  userLoginFailure,
  userLoginRequest,
  userLogout,
} from "../_actions/actions";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};
export const authentication = handleActions(
  {
    [userLoginRequest]: () => ({
      loggingIn: true,
    }),
    [userLoginSuccess]: (state, { payload }) => ({
      loggingIn: true,
      user: payload,
    }),
    [userLoginFailure]: () => ({loggingIn: false}),
    [userLogout]: () => ({loggingIn: false}),
  },
  initialState
);
