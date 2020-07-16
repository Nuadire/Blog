import { handleActions } from "redux-actions";
import { alertSuccess, alertError, alertClear } from "../_actions/actions";

export const alert = handleActions(
  {
    [alertSuccess]: (state, { payload }) => ({
      type: "success",
      message: payload,
    }),
    [alertError]: (state, { payload }) => ({
      type: "error",
      message: payload,
    }),
    [alertClear]: () => ({}),
  },
  {}
);
