import {
  ADD_EXAMPLE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./actionTypes";

export const addExample = (exampleToAdd) => ({
  type: ADD_EXAMPLE,
  payload: {
    text: exampleToAdd,
    id: Date.now(),
  },
});

export const logInUser = (email, password) => ({
  type: LOGIN_REQUEST,
  email,
  password,
});

export const loginSuccess = (token) => {
  localStorage.setItem("token", token);
  return {
    type: LOGIN_SUCCESS,
    payload: { token },
  };
};

export const loginFailure = (error) => {
  localStorage.removeItem("token");
  return {
    type: LOGIN_FAILURE,
    payload: { error },
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return { type: LOGOUT };
};
