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
} from "actions/actionTypes";

const initialState = {
  token: null,
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
      const { token, user } = action;
      return {
        token: token,
        user: user,
        isAuthenticated: true,
        isAuthenticating: false,
        message: null,
      };

    case SKIP_AUTH_CHECK:
      return {
        token: null,
        user: null,
        isAuthenticating: false,
        isAuthenticated: false,
        message: null,
      };

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
      const { message } = action;
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isAuthenticating: false,
        message: message,
      };
    }

    case SIGN_UP_REQUEST: {
      return {
        isAuthenticating: true,
        message: null,
        ...state,
      };
    }

    case SIGN_UP_SUCCESS: {
      const { token, user, message } = action;
      return {
        token: token,
        user: user,
        isAuthenticated: true,
        isAuthenticating: false,
        message: message,
      };
    }

    case SIGN_UP_FAILURE: {
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
