import {
  GET_CARDS,
  GET_CARD,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  CARD_FORM,
} from "actionTypes";

const action = (type, payload = {}) => ({ type, ...payload });

export const card = {
  getAll: {
    request: (username) => action(GET_CARDS.request, { username }),
    success: (cards) => action(GET_CARDS.success, { cards }),
    failure: (error) => action(GET_CARDS.failure, { error }),
    reset: () => action(GET_CARDS.reset),
  },
  // get: {
  //   request: (userName) => action(GET_CARD.request, { userName }),
  //   success: (card) => action(GET_CARD.success, { card }),
  //   failure: (error) => action(GET_CARD.failure, { error }),
  //   reset: () => action(GET_CARD.reset),
  // },
  create: {
    request: (card) => action(CREATE_CARD.request, { card }),
    success: (card) => action(CREATE_CARD.success, { card }),
    failure: (error) => action(CREATE_CARD.failure, { error }),
    reset: () => action(CREATE_CARD.reset),
  },
  update: {
    request: (updatedCard) => action(UPDATE_CARD.request, { updatedCard }),
    success: (updatedCard) => action(UPDATE_CARD.success, { updatedCard }),
    failure: (error) => action(UPDATE_CARD.failure, { error }),
    reset: () => action(UPDATE_CARD.reset),
  },
  delete: {
    request: (id) => action(DELETE_CARD.request, { id }),
    success: (id) => action(DELETE_CARD.success, { id }),
    failure: (error) => action(DELETE_CARD.failure, { error }),
    reset: () => action(DELETE_CARD.reset),
  },
  form: {
    create: {
      show: () => action(CARD_FORM.create.show),
      hide: () => action(CARD_FORM.create.hide),
    },
    edit: {
      set: (cardId) => action(CARD_FORM.edit.set, { cardId }),
      clear: () => action(CARD_FORM.edit.clear),
    },
  },
};
