import {
  GET_CARDS,
  GET_CARD,
  CREATE_CARD,
  EDIT_CARD,
  DELETE_CARD,
} from "actionTypes";
import { combineReducers } from "redux";
import { normaliseArray } from "utils/normaliseArray";

const initialState = { cards: {} };

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS.success:
      return { ...state, cards: normaliseArray(action.cards) };

    case GET_CARD.success:
      return { ...state, cards: action.card };
    case CREATE_CARD.success:
      return { ...state, cards: { ...action.card, ...state.cards } };
    case EDIT_CARD.success:
      return {
        ...state,
        cards: { [action.updatedCard.id]: action.updatedCard },
      };
    case DELETE_CARD.success:
      const cardId = action.cardId;
      let { [cardId]: _, ...rest } = state.cards;
      return { ...state, cards: rest };

    case GET_CARDS.request:
    case GET_CARD.request:
    case CREATE_CARD.request:
    case EDIT_CARD.request:
    case DELETE_CARD.request:
    case GET_CARDS.failure:
    case GET_CARD.failure:
    case CREATE_CARD.failure:
    case EDIT_CARD.failure:
    case DELETE_CARD.failure:
      return { ...state };

    case GET_CARDS.reset:
    case GET_CARD.reset:
    case CREATE_CARD.reset:
    case EDIT_CARD.reset:
    case DELETE_CARD.reset:
      return { ...state, ...initialState };

    default:
      return state;
  }
};

const statusReducer = (state = { status: "idle" }, action) => {
  switch (action.type) {
    case GET_CARDS.request:
    case GET_CARD.request:
    case CREATE_CARD.request:
    case EDIT_CARD.request:
    case DELETE_CARD.request:
      return { ...state, status: "loading" };

    case GET_CARDS.success:
    case GET_CARD.success:
    case CREATE_CARD.success:
    case EDIT_CARD.success:
    case DELETE_CARD.success:
      return { ...state, status: "succeeded" };

    case GET_CARDS.failure:
    case GET_CARD.failure:
    case CREATE_CARD.failure:
    case EDIT_CARD.failure:
    case DELETE_CARD.failure:
      return { ...state, status: "failed" };

    case GET_CARDS.reset:
    case GET_CARD.reset:
    case CREATE_CARD.reset:
    case EDIT_CARD.reset:
    case DELETE_CARD.reset:
      return { ...state, status: "idle" };

    default:
      return state;
  }
};

const errorReducer = (state = { error: null }, action) => {
  switch (action.type) {
    case GET_CARDS.failure:
    case GET_CARD.failure:
    case CREATE_CARD.failure:
    case EDIT_CARD.failure:
    case DELETE_CARD.failure:
      return { ...state, error: action.error };

    case GET_CARDS.request:
    case GET_CARD.request:
    case CREATE_CARD.request:
    case EDIT_CARD.request:
    case DELETE_CARD.request:
    case GET_CARD.success:
    case CREATE_CARD.success:
    case EDIT_CARD.success:
    case DELETE_CARD.success:
    case GET_CARD.reset:
    case CREATE_CARD.reset:
    case EDIT_CARD.reset:
    case DELETE_CARD.reset:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const cardsRootReducer = combineReducers({
  cards: cardsReducer,
  cardStatus: statusReducer,
  cardError: errorReducer,
});
