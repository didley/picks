import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { alertReducer } from "./alertReducer";
import { profileReducer } from "./profileReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  profile: profileReducer,
});
