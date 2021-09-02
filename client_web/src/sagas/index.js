import { all } from "redux-saga/effects";

import { watchUserAuth } from "./authSagas";
import { watchAlert } from "./alertSagas";
import { cardsRoot } from "./cardsSagas";
import { profileRoot } from "./profileSagas";
import { picksRoot } from "./pickSagas";

export function* rootSaga() {
  yield all([
    watchUserAuth(),
    watchAlert(),
    cardsRoot(),
    profileRoot(),
    picksRoot(),
  ]);
}
