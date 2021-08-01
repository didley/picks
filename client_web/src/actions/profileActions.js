import { GET_PROFILE_SUMMARY, UPDATE_PROFILE_SUMMARY } from "actionTypes";

const action = (type, payload = {}) => ({ type, ...payload });

export const profile = {
  getSummary: {
    request: (username) => action(GET_PROFILE_SUMMARY.request, { username }),
    success: (profileSummary) =>
      action(GET_PROFILE_SUMMARY.success, { profileSummary }),
    failure: (error) => action(GET_PROFILE_SUMMARY.failure, { error }),
    reset: () => action(GET_PROFILE_SUMMARY.reset),
  },
  updateSummary: {
    request: (updatedData, setFormHiddenCB) =>
      action(UPDATE_PROFILE_SUMMARY.request, { updatedData, setFormHiddenCB }),
    success: (updatedData) =>
      action(UPDATE_PROFILE_SUMMARY.success, { updatedData }),
    failure: (error) => action(UPDATE_PROFILE_SUMMARY.failure, { error }),
  },
};
