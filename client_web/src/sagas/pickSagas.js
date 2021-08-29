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

    yield put(picks.getLinkPreview.success(res.data, payload.id));
  } catch (error) {
    const previewNotFound = error.status === 404;
    if (previewNotFound) {
      yield put(picks.getLinkPreview.notFound(payload.id));
    } else {
      const errMsg = "URL error, check it's correct.";
      yield put(picks.getLinkPreview.failure(errMsg, payload.id));
    }
  }
}

function* getLinkPreviewWatcher() {
  yield debounce(2000, GET_LINK_PREVIEW.request, getLinkPreview);
}

export function* picksRoot() {
  yield all([getLinkPreviewWatcher()]);
}
