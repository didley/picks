import { uuid } from "utils/uuid";
import {
  GET_CARDS,
  GET_CARD,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  CARD_FORM,
  ADD_PICK,
  GET_LINK_PREVIEW,
  LINK_PREVIEW_NOT_FOUND,
  REMOVE_PICK,
  UPDATE_PICK,
  SET_PICKS,
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
      set: (card) => action(CARD_FORM.edit.set, { card }),
      clear: () => action(CARD_FORM.edit.clear),
    },
    picks: {
      set: (picks) => action(SET_PICKS, { picks }),
      add: () => action(ADD_PICK, { id: uuid() }),
      remove: (id) => action(REMOVE_PICK, { id }),
      update: (fieldName, newValue, id) =>
        action(UPDATE_PICK, { fieldName, newValue, id }),
      getLinkPreview: {
        request: (url, id) => action(GET_LINK_PREVIEW.request, { url, id }),
        success: (preview, id) =>
          action(GET_LINK_PREVIEW.success, { preview, id }),
        failure: (error, id) => action(GET_LINK_PREVIEW.failure, { error, id }),
        reset: () => action(GET_LINK_PREVIEW.reset),
        notFound: (id) => action(LINK_PREVIEW_NOT_FOUND, { id }),
      },
    },
  },
};
