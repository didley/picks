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
} from "./authTypes";

export const checkIsAuthenticatedAction = () => ({
  type: IS_AUTHENTICATED_REQUEST,
});

export const skipAuthCheck = () => ({
  type: SKIP_AUTH_CHECK,
});

export const isAuthenticatedSuccessAction = (user) => ({
  type: IS_AUTHENTICATED_SUCCESS,
  user,
});

export const logInUserAction = (email, password) => ({
  type: LOGIN_REQUEST,
  email,
  password,
});

export const loginSuccessAction = ({ user, message }) => ({
  type: LOGIN_SUCCESS,

  user,
  message,
});

export const loginFailureAction = (error) => ({
  type: LOGIN_FAILURE,
  message: error.message,
});

export const signUpRequestAction = (username, email, password) => ({
  type: SIGN_UP_REQUEST,
  username,
  email,
  password,
});

export const signUpSuccessAction = ({ user, message }) => ({
  type: SIGN_UP_SUCCESS,

  user,
  message,
});

export const signUpFailureAction = (error) => ({
  type: SIGN_UP_FAILURE,
  message: error.message,
});

export const logoutAction = () => ({ type: LOGOUT });
