import { takeLatest, delay, put } from "redux-saga/effects";
import { alertTypes, clearAlert } from "actions/alertActions";

const {
  SET_GENERAL_ALERT,
  SET_WARNING_ALERT,
  SET_ERROR_ALERT,
  SET_SUCCESS_ALERT,
} = alertTypes;

function* clearTimedAlertTask(payload) {
  if (!payload.timeout) return;
  yield delay(payload.timeout);
  yield put(clearAlert());
}

export function* watchAlert() {
  yield takeLatest(
    [SET_GENERAL_ALERT, SET_WARNING_ALERT, SET_ERROR_ALERT, SET_SUCCESS_ALERT],
    clearTimedAlertTask
  );
}
