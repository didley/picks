import { combineReducers } from "redux";
import examples from "./examples";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({ examples, authReducer });
