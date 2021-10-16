// ! history@4.10.1 dependency required as v5 not compatible with v5 react-router
// this is used to allow for history to be used outside of a component (required for react-router-dom v5)
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const nav = (loc) => {
  history.push(loc);
};

export const getRootUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return process.env.REACT_APP_ROOT_URL_PROD;
  } else {
    return process.env.REACT_APP_ROOT_URL_DEV;
  }
};

export const createLink = (path = "") => getRootUrl() + path;
