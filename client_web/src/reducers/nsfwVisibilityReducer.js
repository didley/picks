import { SET_ALL_NSFW_VISIBILITY } from "actionTypes";

export const nsfwVisibilityReducer = (state = false, action) => {
  if (action.type === SET_ALL_NSFW_VISIBILITY) return action.visible;

  return state;
};
