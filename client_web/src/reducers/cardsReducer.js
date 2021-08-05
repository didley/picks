import {
  GET_CARDS,
  GET_CARD,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  CARD_FORM,
} from "actionTypes";
import { combineReducers } from "redux";
import { normaliseArray } from "utils/normaliseArray";

const cardsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CARDS.success:
      return normaliseArray(action.cards);

    case GET_CARD.success:
      return { ...state, cards: action.card };
    case CREATE_CARD.success:
      return {
        ...{ [action.card._id]: action.card },
        ...state,
      };
    case UPDATE_CARD.success:
      return {
        ...state,
        ...{ [action.updatedCard._id]: action.updatedCard },
      };
    case DELETE_CARD.success:
      const cardId = action.id;
      let { [cardId]: _, ...rest } = state;
      return { ...rest };

    // case GET_CARDS.request:
    // case GET_CARD.request:
    // case CREATE_CARD.request:
    // case UPDATE_CARD.request:
    // case DELETE_CARD.request:
    // case GET_CARDS.failure:
    // case GET_CARD.failure:
    // case CREATE_CARD.failure:
    // case UPDATE_CARD.failure:
    // case DELETE_CARD.failure:
    //   return state;

    // case GET_CARDS.reset:
    // case GET_CARD.reset:
    // case CREATE_CARD.reset:
    // case UPDATE_CARD.reset:
    // case DELETE_CARD.reset:
    //   return {};

    default:
      return state;
  }
};

const statusReducer = (state = "idle", action) => {
  switch (action.type) {
    case GET_CARDS.request:
    case GET_CARD.request:
    case CREATE_CARD.request:
    case UPDATE_CARD.request:
    case DELETE_CARD.request:
      return "loading";

    case GET_CARDS.success:
    case GET_CARD.success:
    case CREATE_CARD.success:
    case UPDATE_CARD.success:
    case DELETE_CARD.success:
      return "succeeded";

    case GET_CARDS.failure:
    case GET_CARD.failure:
    case CREATE_CARD.failure:
    case UPDATE_CARD.failure:
    case DELETE_CARD.failure:
      return "failed";

    case GET_CARDS.reset:
    case GET_CARD.reset:
    case CREATE_CARD.reset:
    case UPDATE_CARD.reset:
    case DELETE_CARD.reset:
      return "idle";

    default:
      return state;
  }
};

const errorReducer = (state = null, action) => {
  switch (action.type) {
    case GET_CARDS.failure:
    case GET_CARD.failure:
    case CREATE_CARD.failure:
    case UPDATE_CARD.failure:
    case DELETE_CARD.failure:
      return { ...state, ...action.error };

    case GET_CARDS.request:
    case GET_CARD.request:
    case CREATE_CARD.request:
    case UPDATE_CARD.request:
    case DELETE_CARD.request:
    case GET_CARD.success:
    case CREATE_CARD.success:
    case UPDATE_CARD.success:
    case DELETE_CARD.success:
    case GET_CARD.reset:
    case CREATE_CARD.reset:
    case UPDATE_CARD.reset:
    case DELETE_CARD.reset:
      return { ...state, ...null };

    default:
      return state;
  }
};

const formReducer = (
  state = { createFromVisible: false, editingId: null },
  action
) => {
  switch (action.type) {
    case CARD_FORM.create.show:
      return { ...state, createFromVisible: true, editingId: null };

    case CARD_FORM.create.hide:
    case CREATE_CARD.success:
      return { ...state, createFromVisible: false };

    case CARD_FORM.edit.set:
      return { ...state, editingId: action.cardId, createFromVisible: false };

    case CARD_FORM.edit.clear:
    case UPDATE_CARD.success:
    case DELETE_CARD.success:
      return { ...state, editingId: null };

    default:
      return state;
  }
};

export const cardsRootReducer = combineReducers({
  cards: cardsReducer,
  cardStatus: statusReducer,
  cardError: errorReducer,
  form: formReducer,
});
