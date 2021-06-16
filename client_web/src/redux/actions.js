import { ADD_EXAMPLE } from "./actionTypes";

export const addExample = (exampleToAdd) => ({
  type: ADD_EXAMPLE,
  payload: {
    text: exampleToAdd,
    id: Date.now(),
  },
});
