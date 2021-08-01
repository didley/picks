import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { alertReducer } from "./alertReducer";
import { profileReducer } from "./profileReducer";
import { LOGOUT } from "actions/authTypes";

const appReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  profile: profileReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === LOGOUT) return appReducer(undefined, action);

  return appReducer(state, action);
};
