import {
  IS_AUTHENTICATED_REQUEST,
  IS_AUTHENTICATED_SUCCESS,
  SKIP_AUTH_CHECK,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./actionTypes";
import { authToken } from "utils/authToken";

export const checkIsAuthenticatedAction = () => ({
  type: IS_AUTHENTICATED_REQUEST,
});

export const skipAuthCheck = () => ({
  type: SKIP_AUTH_CHECK,
});

export const isAuthenticatedSuccessAction = (response) => ({
  type: IS_AUTHENTICATED_SUCCESS,
  token: response.token,
  user: response.user,
});

export const logInUserAction = (email, password) => ({
  type: LOGIN_REQUEST,
  email,
  password,
});

export const loginSuccessAction = (response) => {
  const { token, user } = response;
  const message = `Welcome${
    user?.name ? " " + user?.name : ""
  }, you've been successfully logged in.`;

  authToken.set(token);

  return {
    type: LOGIN_SUCCESS,
    token,
    user,
    message,
  };
};

export const loginFailureAction = (error) => {
  authToken.remove();
  console.error(error);

  const message = `Authentication error${
    error.message ? ": " + error.message : "."
  }`;

  return {
    type: LOGIN_FAILURE,
    message,
  };
};

export const logoutAction = () => {
  authToken.remove();
  return { type: LOGOUT, message: "You have been successfully logged out." };
};
