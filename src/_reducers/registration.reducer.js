import { handleActions } from "redux-actions";
import {
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFailure,
} from "../_actions/actions";

export const registration = handleActions(
  {
    [userRegisterRequest]: () => ({
      registering: true,
    }),
    [userRegisterSuccess]: () => ({}),
    [userRegisterFailure]: () => ({}),
  },
  {}
);