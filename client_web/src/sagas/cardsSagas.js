import {
  takeLatest,
  put,
  all,
  call,
  takeLeading,
  select,
} from "redux-saga/effects";
import { GET_CARDS, CREATE_CARD, UPDATE_CARD, DELETE_CARD } from "actionTypes";
import { card } from "actions/cardActions";
import * as api from "utils/apiCalls/cards";
import { selectFormPicks, selectDraftCard } from "reducers/selectors";
import {
  setSuccessAlert,
  setErrorAlert,
  setGeneralAlert,
} from "actions/alertActions";

function* getCards(payload) {
  try {
    const { data } = yield call(api.getCardsByUsername, payload.username);

    yield put(card.getAll.success(data));
  } catch (error) {
    yield put(setErrorAlert({ message: error.message, timeout: 3000 }));
    yield put(card.getAll.failure(error));
  }
}

function* getCardsWatcher() {
  yield takeLatest(GET_CARDS.request, getCards);
}

function* createCard(payload) {
  try {
    const { data } = yield call(api.createCard, payload.card);
    yield put(setSuccessAlert({ message: "Picks created", timeout: 3000 }));
    yield put(card.create.success(data));
  } catch (error) {
    yield put(setErrorAlert({ message: error.message, timeout: 3000 }));
    yield put(card.create.failure(error));
  }
}

function* createCardWatcher() {
  yield takeLeading(CREATE_CARD.request, createCard);
}

function* updateCard() {
  const draftCard = yield select(selectDraftCard);

  const sanitiseEditingCard = (editingDraftCard) => {
    if (editingDraftCard.picks) {
      const strippedIdPicks = editingDraftCard.picks.map(
        ({ _id, ...rest }) => rest
      );
      editingDraftCard.picks = strippedIdPicks;
    }

    const { createdBy, editing, ...rest } = editingDraftCard;

    return rest;
  };
  const sanitisedCard = sanitiseEditingCard(draftCard);

  try {
    const { data } = yield call(api.updateCard, sanitisedCard);
    yield put(setSuccessAlert({ message: "Picks updated", timeout: 3000 }));
    yield put(card.update.success(data));
  } catch (error) {
    yield put(setErrorAlert({ message: error.message, timeout: 3000 }));
    yield put(card.update.failure(error));
  }
}

function* updateCardWatcher() {
  yield takeLeading(UPDATE_CARD.request, updateCard);
}

function* deleteCard(payload) {
  try {
    const { data } = yield call(api.deleteCard, payload.id);
    yield put(setGeneralAlert({ message: "Card deleted", timeout: 3000 }));
    yield put(card.delete.success(data._id));
  } catch (error) {
    yield put(setErrorAlert({ message: error.message, timeout: 3000 }));
    yield put(card.delete.failure(error));
  }
}

function* deleteCardWatcher() {
  yield takeLeading(DELETE_CARD.request, deleteCard);
}

export function* cardsRoot() {
  yield all([
    getCardsWatcher(),
    createCardWatcher(),
    updateCardWatcher(),
    deleteCardWatcher(),
  ]);
}
