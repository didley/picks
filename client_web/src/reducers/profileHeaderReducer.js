import { GET_PROFILE_SUMMARY, UPDATE_PROFILE_SUMMARY } from "actionTypes";
import { combineReducers } from "redux";

const profileSummaryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROFILE_SUMMARY.success:
      return action.profileSummary;

    case UPDATE_PROFILE_SUMMARY.success:
      return action.updatedData;

    case GET_PROFILE_SUMMARY.failure:
    case GET_PROFILE_SUMMARY.reset:
      return {};

    case UPDATE_PROFILE_SUMMARY.failure:
    case UPDATE_PROFILE_SUMMARY.reset:
      return state;

    default:
      return state;
  }
};

const statusReducer = (state = "idle", action) => {
  switch (action.type) {
    case GET_PROFILE_SUMMARY.request:
    case UPDATE_PROFILE_SUMMARY.request:
      return "loading";

    case GET_PROFILE_SUMMARY.success:
    case UPDATE_PROFILE_SUMMARY.success:
      return "succeeded";

    case GET_PROFILE_SUMMARY.failure:
    case UPDATE_PROFILE_SUMMARY.failure:
      return "failed";

    case GET_PROFILE_SUMMARY.reset:
    case UPDATE_PROFILE_SUMMARY.reset:
      return "idle";

    default:
      return state;
  }
};

const errorReducer = (state = null, action) => {
  switch (action.type) {
    case GET_PROFILE_SUMMARY.failure:
    case UPDATE_PROFILE_SUMMARY.failure:
      return { ...state, ...action.error };

    case GET_PROFILE_SUMMARY.request:
    case GET_PROFILE_SUMMARY.reset:
    case UPDATE_PROFILE_SUMMARY.request:
    case UPDATE_PROFILE_SUMMARY.reset:
      return { ...state, ...null };

    default:
      return state;
  }
};

export const profileHeaderReducer = combineReducers({
  data: profileSummaryReducer,
  status: statusReducer,
  error: errorReducer,
});
