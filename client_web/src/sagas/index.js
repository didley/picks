import { all } from "redux-saga/effects";

import { watchUserAuth } from "./authSagas";
import { watchAlert } from "./alertSagas";

export function* rootSaga() {
  yield all([watchUserAuth(), watchAlert()]);
}
