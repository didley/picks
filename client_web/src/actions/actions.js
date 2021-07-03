import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./actionTypes";

export const logInUserAction = (email, password) => ({
  type: LOGIN_REQUEST,
  email,
  password,
});

export const loginSuccessAction = (response) => {
  const { token, user } = response;
  const message = `Welcome${
    user.name ? " " + user?.name : ""
  }, you've been successfully logged in.`;

  localStorage.setItem("token", token);

  return {
    type: LOGIN_SUCCESS,
    token,
    user,
    message,
  };
};

export const loginFailureAction = (error) => {
  localStorage.removeItem("token");
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
  localStorage.removeItem("token");
  return { type: LOGOUT, message: "You have been successfully logged out." };
};
