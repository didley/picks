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
  statusText: null,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        isAuthenticating: true,
        statusText: null,
        ...state,
      };
    }

    case LOGIN_SUCCESS: {
      const { token, user } = action.payload;
      return {
        token: token,
        user: user,
        isAuthenticated: true,
        isAuthenticating: false,
        statusText: `Welcome${
          user ? " " + user?.name : null
        }, you've been successfully logged in.`,
      };
    }

    case LOGIN_FAILURE: {
      const { message = null } = action.payload;
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isAuthenticating: false,
        statusText: `Authentication error${message ? ": " + message : "."}`,
      };
    }

    case LOGOUT: {
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isAuthenticating: false,
        statusText: "You have been successfully logged out.",
      };
    }

    default:
      return state;
  }
}
