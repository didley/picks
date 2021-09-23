import produce from "immer";
import {
  GET_CARDS,
  GET_CARD,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  GET_LINK_PREVIEW,
  LINK_PREVIEW_NOT_FOUND,
  SET_CREATING,
  SET_EDITING,
  CLEAR_DRAFT,
  DRAFT_PICK,
  CHANGE_DRAFT,
} from "actionTypes";
import { combineReducers } from "redux";
import { normaliseArray, denormalise } from "utils/normaliseArray";
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

const draftReducer = (state = null, action) => {
  switch (action.type) {
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

    case DRAFT_PICK.move: {
      // un-serialise/re-serialise implementation, refactor was attempted but didn't result in cleaner outcome as swapping elements of array or serialised object sucks in js sucks.

      const { fromId, toId } = action;
      if (!fromId || !toId) return state;

      const picksArray = denormalise(state.picks);

      const fromIndex = picksArray.findIndex((el) => el._id === fromId);
      const toIndex = picksArray.findIndex((el) => el._id === toId);
      if (fromIndex === -1 || toIndex === -1) return state;

      const movedPicks = produce(picksArray, (draft) => {
        draft[toIndex] = picksArray[fromIndex];
        draft[fromIndex] = picksArray[toIndex];
      });
      const serialisedPicks = normaliseArray(movedPicks);

      return { ...state, picks: serialisedPicks };
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
  draft: draftReducer,
});
