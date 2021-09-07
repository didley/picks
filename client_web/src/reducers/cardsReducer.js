import produce from "immer";
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
  UPDATE_PICK,
  GET_LINK_PREVIEW,
  LINK_PREVIEW_NOT_FOUND,
  SET_CREATING,
  SET_EDITING,
  CLEAR_DRAFT,
  DRAFT_PICK,
  CHANGE_DRAFT,
} from "actionTypes";
import { combineReducers } from "redux";
import { normaliseArray } from "utils/normaliseArray";
import { parseMultiInputEvent } from "utils/parseMultiInputEvent";

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

const cardStatusReducer = (state = "idle", action) => {
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

const formVisibilityReducer = (
  state = { createFormVisible: false, editingId: null },
  action
) => {
  switch (action.type) {
    case CARD_FORM.create.show:
      return { ...state, createFormVisible: true, editingId: null };

    case CARD_FORM.create.hide:
    case CREATE_CARD.success:
      return { ...state, createFormVisible: false };

    case CARD_FORM.edit.set:
      return { ...state, editingId: action.card._id, createFormVisible: false };

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

    case SET_PICKS:
      return normaliseArray(action.picks);

    case CARD_FORM.create.hide:
    case CREATE_CARD.success:
    case CARD_FORM.edit.clear:
    case UPDATE_CARD.success:
    case DELETE_CARD.success:
      return {};

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

    case UPDATE_PICK: {
      const { id, fieldName, newValue } = action;

      return {
        ...state,
        ...{
          [id]: {
            ...state[id],
            [fieldName]: newValue,
          },
        },
      };
    }

    case GET_LINK_PREVIEW.request: {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          url: action.url,
          preview: null,
          status: "loading",
          error: null,
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
          error: null,
        },
      };

    case LINK_PREVIEW_NOT_FOUND:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          preview: null,
          status: "notFound",
          error: action.error,
        },
      };

    case GET_LINK_PREVIEW.failure:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          status: "failed",
          error: action.error,
        },
      };

    case GET_LINK_PREVIEW.reset:
      return {
        ...state,
        [action.id]: { url: "", preview: null, status: "idle", error: null },
      };
    default:
      return state;
  }
};

const formReducers = combineReducers({
  visibility: formVisibilityReducer,
  picks: picksReducer,
});

const draftReducer = (state = null, action) => {
  switch (action.type) {
    case CARD_FORM.create.show:
    case SET_CREATING:
      return {
        comments: "",
        picks: {
          initialCreateCardPickId: {
            url: "",
            preview: null,
            status: "idle",
            _id: "initialCreateCardPickId",
          },
        },
      };

    case CARD_FORM.edit.set:
    case SET_EDITING: {
      const { card } = action;

      return {
        editingId: card._id,
        ...{ ...card, picks: normaliseArray(card.picks) },
      };
    }
    case CHANGE_DRAFT: {
      const { event, id } = action;

      const { fieldName, newValue } = parseMultiInputEvent(event);

      const nextState = produce(state, (draftState) => {
        if (id) draftState.picks[id][fieldName] = newValue;
        else draftState[fieldName] = newValue;
      });

      return nextState;
    }

    case CLEAR_DRAFT:
      return null;

    case DRAFT_PICK.add:
      return produce(state, (draft) => {
        draft.picks[action.id] = {
          url: "",
          nsfw: false,
          preview: null,
          status: "idle",
          _id: action.id,
        };
      });

    case DRAFT_PICK.remove: {
      let { [action.id]: _, ...rest } = state?.picks;
      return { ...state, picks: rest };
    }

    case GET_LINK_PREVIEW.request: {
      return produce(state, (draft) => {
        const pick = draft.picks[action.id];
        pick.preview = null;
        pick.status = "loading";
        pick.error = null;
      });
    }

    case GET_LINK_PREVIEW.success:
      return produce(state, (draft) => {
        const pick = draft.picks[action.id];
        pick.preview = action.preview;
        pick.status = "succeeded";
        pick.error = null;
      });

    case LINK_PREVIEW_NOT_FOUND:
      return produce(state, (draft) => {
        const pick = draft.picks[action.id];
        pick.preview = null;
        pick.status = "notFound";
        pick.error = action.error;
      });

    case GET_LINK_PREVIEW.failure:
      return produce(state, (draft) => {
        const pick = draft.picks[action.id];
        pick.status = "failed";
        pick.error = action.error;
      });

    case GET_LINK_PREVIEW.reset:
      return produce(state, (draft) => {
        const pick = draft.picks[action.id];
        pick.preview = null;
        pick.status = "idle";
        pick.error = null;
      });

    case CREATE_CARD.success:
    case UPDATE_CARD.success:
    case DELETE_CARD.success:
      return null;

    default:
      return state;
  }
};

export const cardsRootReducer = combineReducers({
  cards: cardsReducer,
  cardStatus: cardStatusReducer,
  cardError: errorReducer,
  form: formReducers,
  draft: draftReducer,
});
