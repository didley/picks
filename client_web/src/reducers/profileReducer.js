import { combineReducers } from "redux";
import { cardsRootReducer } from "./cardsReducer";
import { profileHeaderReducer } from "./profileHeaderReducer";

export const profileReducer = combineReducers({
  profileHeader: profileHeaderReducer,
  profileCards: cardsRootReducer,
});
