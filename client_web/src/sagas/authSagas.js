import {
  call,
  put,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import {
  IS_AUTHENTICATED_REQUEST,
  LOGIN_REQUEST,
  LOGOUT,
  SIGN_UP_REQUEST,
} from "actions/authTypes";
import {
  isAuthenticatedSuccessAction,
  skipAuthCheck,
  loginSuccessAction,
  loginFailureAction,
  signUpSuccessAction,
  signUpFailureAction,
} from "actions/authActions";
import * as authApi from "../utils/apiCalls/auth";
import { authToken } from "utils/authToken";

import { setSuccessAlert, setErrorAlert } from "actions/alertActions";

function* checkIsLoggedIn() {
  try {
    const token = yield authToken.get();
    if (token) {
      const { data } = yield call(authApi.getUser);
      yield put(isAuthenticatedSuccessAction(data));
    } else {
      yield put(skipAuthCheck());
    }
  } catch (err) {
    yield put(loginFailureAction(err));
  }
}

function* logInSaga(payload) {
  try {
    const res = yield call(authApi.logInUser, payload.email, payload.password);

    res.message = `Welcome, you've been successfully logged in.`;

    authToken.set(res.token);
    yield put(loginSuccessAction(res));
    yield put(setSuccessAlert({ message: res.message, timeout: 3000 }));
  } catch (err) {
    authToken.remove();
    yield put(setErrorAlert({ message: err.message, timeout: 3000 }));
    yield put(loginFailureAction(err));
  }
}

function* signUpSaga(payload) {
  try {
    const res = yield call(
      authApi.signUpUser,
      payload.username,
      payload.email,
      payload.password
    );
    res.message = "Welcome, you've successfully signed up to Picks.";
    yield put(signUpSuccessAction(res));
    yield put(setSuccessAlert({ message: res.message, timeout: 3000 }));
  } catch (err) {
    yield put(setErrorAlert({ message: err.message, timeout: 3000 }));
    yield put(signUpFailureAction(err));
  }
}

function* logoutSaga() {
  authToken.remove();
  yield put(
    setSuccessAlert({ message: "Successfully logged out", timeout: 3000 })
  );
}

export function* watchUserAuth() {
  yield takeLatest(IS_AUTHENTICATED_REQUEST, checkIsLoggedIn);
  yield takeLeading(LOGIN_REQUEST, logInSaga);
  yield takeLeading(SIGN_UP_REQUEST, signUpSaga);
  yield takeEvery(LOGOUT, logoutSaga);
}
