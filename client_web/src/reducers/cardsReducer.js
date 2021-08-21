import {
  GET_CARDS,
  GET_CARD,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  CARD_FORM,
  SET_PICKS,
  ADD_PICK,
  REMOVE_PICK,
  GET_LINK_PREVIEW,
  LINK_PREVIEW_NOT_FOUND,
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
      return { ...state, editingId: action.card._id, createFromVisible: false };

    case CARD_FORM.edit.clear:
    case UPDATE_CARD.success:
    case DELETE_CARD.success:
      return { ...state, editingId: null };

    default:
      return state;
  }
};

const picksReducer = (state = {}, action) => {
  switch (action.type) {
    case CARD_FORM.create.show:
      return {
        initialCardFormShowID123: {
          url: "",
          preview: null,
          status: "idle",
          _id: "initialCardFormShowID123",
        },
      };
    case CARD_FORM.edit.set:
      return normaliseArray(action.card.picks);

    case CARD_FORM.create.hide:
    case CREATE_CARD.success:
    case CARD_FORM.edit.clear:
    case UPDATE_CARD.success:
    case DELETE_CARD.success:
      return {};

    case SET_PICKS:
      return normaliseArray(action.picks);

    case ADD_PICK:
      return {
        ...state,
        ...{
          [action.id]: {
            url: "",
            preview: null,
            status: "idle",
            _id: action.id,
          },
        },
      };
    case REMOVE_PICK: {
      let { [action.id]: _, ...rest } = state;
      return { ...rest };
    }

    case GET_LINK_PREVIEW.request: {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          url: action.url,
          preview: null,
          status: "loading",
        },
      };
    }

    case GET_LINK_PREVIEW.success:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          preview: action.preview,
          status: "succeeded",
        },
      };

    case LINK_PREVIEW_NOT_FOUND:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          preview: null,
          status: "notFound",
        },
      };

    case GET_LINK_PREVIEW.failure:
      return {
        ...state,
        [action.id]: { ...state[action.id], status: "failed" },
      };

    case GET_LINK_PREVIEW.reset:
      return {
        ...state,
        [action.id]: { url: "", preview: null, status: "idle" },
      };
    default:
      return state;
  }
};

export const cardsRootReducer = combineReducers({
  cards: cardsReducer,
  cardStatus: statusReducer,
  cardError: errorReducer,
  form: formReducer,
  picks: picksReducer,
});
