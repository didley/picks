import { uuid } from "utils/uuid";
import {
  GET_CARDS,
  GET_CARD,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  GET_LINK_PREVIEW,
  LINK_PREVIEW_NOT_FOUND,
  SET_CREATING,
  SET_EDITING,
  CLEAR_DRAFT,
  DRAFT_PICK,
  CHANGE_DRAFT,
  SET_TAGS,
} from "actionTypes";

const action = (type, payload = {}) => ({ type, ...payload });

export const card = {
  getAll: {
    request: (username) => action(GET_CARDS.request, { username }),
    success: (cards) => action(GET_CARDS.success, { cards }),
    failure: (error) => action(GET_CARDS.failure, { error }),
    reset: () => action(GET_CARDS.reset),
  },
  get: {
    request: (id) => action(GET_CARD.request, { id }),
    success: (card) => action(GET_CARD.success, { card }),
    failure: (error) => action(GET_CARD.failure, { error }),
    reset: () => action(GET_CARD.reset),
  },
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
  getLinkPreview: {
    request: (url, id) => action(GET_LINK_PREVIEW.request, { url, id }),
    success: (preview, id) => action(GET_LINK_PREVIEW.success, { preview, id }),
    failure: (error, id) => action(GET_LINK_PREVIEW.failure, { error, id }),
    reset: () => action(GET_LINK_PREVIEW.reset),
    notFound: (id) => action(LINK_PREVIEW_NOT_FOUND, { id }),
  },
  draft: {
    set: {
      creating: () => action(SET_CREATING),
      editing: (card) => action(SET_EDITING, { card }),
    },
    change: (event, id) => action(CHANGE_DRAFT, { event, id }), // supply id for picks
    setTags: (tags) => action(SET_TAGS, { tags }),
    clear: () => action(CLEAR_DRAFT),
    pick: {
      add: () => action(DRAFT_PICK.add, { id: uuid() }),
      remove: (id) => action(DRAFT_PICK.remove, { id }),
      move: (fromId, toId) => action(DRAFT_PICK.move, { fromId, toId }),
    },
  },
};
