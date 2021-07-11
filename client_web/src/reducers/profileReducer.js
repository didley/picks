import { combineReducers } from "redux";

import { userHeaderReducer } from "./userHeaderReducer";
import { cardsRootReducer } from "./cardsReducer";

export const profileReducer = combineReducers({
  // userHeader: userHeaderReducer,
  profileCards: cardsRootReducer,
});
