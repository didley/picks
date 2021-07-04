import { call, put, takeLatest, spawn } from "redux-saga/effects";
import {
  isAuthenticatedSuccessAction,
  loginSuccessAction,
  loginFailureAction,
  skipAuthCheck,
} from "actions/actions";
import { authToken } from "utils/authToken";
import * as authApi from "../utils/apiCalls/auth";
import { IS_AUTHENTICATED_REQUEST, LOGIN_REQUEST } from "actions/actionTypes";

function* checkIsLoggedIn() {
  try {
    const token = yield authToken.get();
    if (token) {
      const res = yield call(authApi.getUser);
      yield put(isAuthenticatedSuccessAction(res));
    } else {
      yield put(skipAuthCheck());
    }
  } catch (err) {
    yield put(loginFailureAction(err));
  }
}

function* logInSaga(payload) {
  try {
    const response = yield call(
      authApi.logInUser,
      payload.email,
      payload.password
    );
    yield put(loginSuccessAction(response));
  } catch (err) {
    yield put(loginFailureAction(err));
  }
}

function* watchUserAuth() {
  yield takeLatest(IS_AUTHENTICATED_REQUEST, checkIsLoggedIn);
  yield takeLatest(LOGIN_REQUEST, logInSaga);
}

export function* rootSaga() {
  yield spawn(watchUserAuth);
}
