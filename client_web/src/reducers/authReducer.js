import {
  IS_AUTHENTICATED_REQUEST,
  IS_AUTHENTICATED_SUCCESS,
  SKIP_AUTH_CHECK,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOGOUT,
} from "actions/authTypes";

const initialState = {
  user: null,
  isAuthenticated: false,
  isAuthenticating: true,
  message: null,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case IS_AUTHENTICATED_REQUEST:
      return {
        isAuthenticating: true,
        message: null,
        ...state,
      };

    case IS_AUTHENTICATED_SUCCESS:
      const { user } = action;
      return {
        user: user,
        isAuthenticated: true,
        isAuthenticating: false,
        message: null,
      };

    case SKIP_AUTH_CHECK:
      return {
        user: null,
        isAuthenticating: false,
        isAuthenticated: false,
        message: null,
      };

    case LOGIN_REQUEST:
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isAuthenticating: true,
        message: null,
      };
    }

    case LOGIN_SUCCESS:
    case SIGN_UP_SUCCESS: {
      const { user, message } = action;
      return {
        user: user,
        isAuthenticated: true,
        isAuthenticating: false,
        message: message,
      };
    }

    case LOGIN_FAILURE:
    case SIGN_UP_FAILURE: {
      const { message } = action;
      return {
        user: null,
        isAuthenticated: false,
        isAuthenticating: false,
        message: message,
      };
    }

    case LOGOUT: {
      return {
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
