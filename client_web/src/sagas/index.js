import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actions/actionTypes";
import * as actions from "../actions/actions";
import * as api from "../utils/apiCalls/auth";

function* logInSaga(action) {
  try {
    console.log("logInSaga run!");
    const user = yield call(api.logInUser, [action.email, action.password]); // ! WORKING ON getting access to action
    yield put({ type: LOGIN_SUCCESS, user });
  } catch (err) {
    yield put({ type: LOGIN_FAILURE, message: err.message });
  }
}

function* watchLogInSaga(action) {
  yield takeLatest(LOGIN_REQUEST, logInSaga(action));
}

export function* rootSaga() {
  yield all([call(logInSaga), call(watchLogInSaga)]);
}
