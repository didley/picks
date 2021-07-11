import { takeLatest, put, all, call } from "redux-saga/effects";
import { GET_CARDS } from "actionTypes";
import { card } from "actions/cardActions";
import { getUsersCards } from "utils/apiCalls/cards";

function* getCards({ userName }) {
  try {
    const { data } = yield call(getUsersCards);
    yield put(card.getAll.success(data));
  } catch (error) {
    yield put(card.getAll.failure(error));
  }
}

function* watchGetCards() {
  yield takeLatest(GET_CARDS.request, getCards);
}

export function* cardsRoot() {
  yield all([watchGetCards()]);
}
