import {
  takeLatest,
  put,
  all,
  call,
  takeLeading,
  debounce,
} from "redux-saga/effects";
import { GET_LINK_PREVIEW } from "actionTypes";
import { picks } from "actions/pickActions";
import * as api from "utils/apiCalls/picks";
import {
  setSuccessAlert,
  setErrorAlert,
  setGeneralAlert,
} from "actions/alertActions";

function* getLinkPreview(payload) {
  try {
    const res = yield call(api.getLinkPreview, payload.url);

    const previewNotFound = res.status === 404;
    if (previewNotFound) {
      yield put(picks.getLinkPreview.notFound, payload.id);
    } else {
      yield put(picks.getLinkPreview.success(res.data, payload.id));
    }
  } catch (error) {
    yield put(setErrorAlert({ message: error.message, timeout: 3000 }));
    yield put(picks.getLinkPreview.failure(error));
  }
}

function* getLinkPreviewWatcher() {
  const halfMs = 500;
  yield debounce(halfMs, GET_LINK_PREVIEW.request, getLinkPreview);
}

export function* picksRoot() {
  yield all([getLinkPreviewWatcher()]);
}
