import { takeLatest, put, all, call, takeLeading } from "redux-saga/effects";
import { GET_CARDS, CREATE_CARD } from "actionTypes";
import { card } from "actions/cardActions";
import * as api from "utils/apiCalls/cards";

function* getCards(payload) {
  try {
    const { data } = yield call(api.getUsersCards);
    yield put(card.getAll.success(data));
  } catch (error) {
    yield put(card.getAll.failure(error));
  }
}

function* getCardsWatcher() {
  yield takeLatest(GET_CARDS.request, getCards);
}

function* createCard(payload) {
  try {
    const { data } = yield call(api.createCard, payload.card);
    yield put(card.create.success(data));
  } catch (error) {
    yield put(card.create.failure(error));
  }
}

function* createCardWatcher() {
  yield takeLeading(CREATE_CARD.request, createCard);
}

export function* cardsRoot() {
  yield all([getCardsWatcher(), createCardWatcher()]);
}
