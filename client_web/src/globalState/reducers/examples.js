import { ADD_EXAMPLE } from "../actionTypes";

const initialState = {
  examples: [],
};

export default function examplesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EXAMPLE: {
      const { text, id } = action.payload;
      return {
        ...state,
        examples: [{ text, id }, ...state.examples],
      };
    }

    default:
      return state;
  }
}
