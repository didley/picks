import { all } from "redux-saga/effects";

import { watchUserAuth } from "./authSagas";
import { watchAlert } from "./alertSagas";
import { cardsRoot } from "./cardsSagas";
import { profileRoot } from "./profileSagas";

export function* rootSaga() {
  yield all([watchUserAuth(), watchAlert(), cardsRoot(), profileRoot()]);
}
