import { takeLatest, put, all, call, takeLeading } from "redux-saga/effects";
import { GET_PROFILE_SUMMARY, UPDATE_PROFILE_SUMMARY } from "actionTypes";
import * as api from "utils/apiCalls/profile";
import { profile } from "actions/profileActions";
import { setErrorAlert, setSuccessAlert } from "actions/alertActions";

function* getProfileSummary(payload) {
  try {
    const { data } = yield call(api.getProfileSummary, payload.username);

    yield put(profile.getSummary.success(data));
  } catch (error) {
    yield put(setErrorAlert({ message: error.message, timeout: 3000 }));
    yield put(profile.getSummary.failure(error));
  }
}

function* getProfileSummaryWatcher() {
  yield takeLatest(GET_PROFILE_SUMMARY.request, getProfileSummary);
}

function* updateProfileSummary(payload) {
  try {
    const { data } = yield call(api.updateProfileSummary, payload.updatedData);
    yield payload.setFormHiddenCB();
    yield put(profile.updateSummary.success(data));

    yield put(setSuccessAlert({ message: "Profile updated", timeout: 3000 }));
  } catch (error) {
    yield put(setErrorAlert({ message: error.message, timeout: 3000 }));
    yield put(profile.updateSummary.failure(error));
  }
}

function* updateProfileSummaryWatcher() {
  yield takeLeading(UPDATE_PROFILE_SUMMARY.request, updateProfileSummary);
}

export function* profileRoot() {
  yield all([getProfileSummaryWatcher(), updateProfileSummaryWatcher()]);
}
