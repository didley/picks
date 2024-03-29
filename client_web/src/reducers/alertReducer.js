import { alertTypes } from "actions/alertActions";

const initialState = {
  style: "GENERAL",
  message: null,
  details: null,
};

export function alertReducer(state = initialState, action) {
  switch (action.type) {
    case alertTypes.SET_GENERAL_ALERT:
      return {
        style: "GENERAL",
        message: action.message,
        details: action.extraDetails,
      };

    case alertTypes.SET_WARNING_ALERT:
      return {
        style: "WARNING",
        message: action.message,
        details: action.extraDetails,
      };

    case alertTypes.SET_ERROR_ALERT:
      return {
        style: "ERROR",
        message: action.message,
        details: action.extraDetails,
      };

    case alertTypes.SET_SUCCESS_ALERT:
      return {
        style: "SUCCESS",
        message: action.message,
        details: action.extraDetails,
      };

    case alertTypes.SET_LOADING_ALERT:
      return {
        style: "LOADING",
        message: "Loading...",
        details: null,
      };

    case alertTypes.CLEAR_ALERT:
      return initialState;

    default:
      return state;
  }
}
