import { handleActions } from 'redux-actions';
import {
  userLoginSuccess,
  userLoginFailure,
  userLoginRequest,
  userLogout,
} from "../_actions/actions";

const {user} = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};
export const authentication = handleActions(
  {
    [userLoginRequest]: () => ({
      loggedIn: false,
    }),
    [userLoginSuccess]: (state, { payload }) => ({
      loggedIn: true,
      user: payload.user,
    }),
    [userLoginFailure]: () => ({loggedIn: false}),
    [userLogout]: () => ({loggedIn: false}),
  },
  initialState
);
