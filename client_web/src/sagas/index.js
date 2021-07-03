import { call, put, fork, takeLatest } from "redux-saga/effects";
import { loginSuccessAction, loginFailureAction } from "actions/actions";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actions/actionTypes";
import * as authApi from "../utils/apiCalls/auth";

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
  yield takeLatest(LOGIN_REQUEST, logInSaga);
}

export function* rootSaga() {
  yield fork(watchUserAuth);
}
