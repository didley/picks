import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actions/actionTypes";

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isAuthenticating: false,
  message: null,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        isAuthenticating: true,
        message: null,
        ...state,
      };
    }

    case LOGIN_SUCCESS: {
      const { token, user, message } = action;
      return {
        token: token,
        user: user,
        isAuthenticated: true,
        isAuthenticating: false,
        message: message,
      };
    }

    case LOGIN_FAILURE: {
      console.log({ action });
      const { message } = action;
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isAuthenticating: false,
        message: message,
      };
    }

    case LOGOUT: {
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isAuthenticating: false,
        message: action.message,
      };
    }

    default:
      return state;
  }
}
