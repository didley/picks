import { GET_CARD, UPDATE_CARD, DELETE_CARD } from "actionTypes";

const cardReducerInitState = { data: {}, error: null, status: "idle" };
export const cardReducer = (state = cardReducerInitState, action) => {
  switch (action.type) {
    case GET_CARD.request:
      return { ...state, data: {}, error: null, status: "loading" };

    case GET_CARD.success:
      return { ...state, data: action.card, error: null, status: "succeeded" };

    case GET_CARD.failure:
      return { data: {}, error: action.error, status: "failed" };

    case GET_CARD.reset:
      return cardReducerInitState;

    case UPDATE_CARD.success: {
      const { updatedCard } = action;
      if (updatedCard._id === state.data._id) {
        return {
          ...state,
          data: updatedCard,
          error: null,
          status: "succeeded",
        };
      } else {
        return state;
      }
    }

    case DELETE_CARD.success:
      return { data: {}, error: null, status: "deleted" };

    default:
      return state;
  }
};
