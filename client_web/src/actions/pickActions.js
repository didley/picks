import { v4 as uuid } from "uuid";
import {
  ADD_PICK,
  GET_LINK_PREVIEW,
  LINK_PREVIEW_NOT_FOUND,
  REMOVE_PICK,
  SET_PICKS,
} from "actionTypes";

const action = (type, payload = {}) => ({ type, ...payload });

export const picks = {
  set: (picks) => action(SET_PICKS, { picks }),
  add: () => action(ADD_PICK, { id: uuid() }),
  remove: (id) => action(REMOVE_PICK, { id }),
  getLinkPreview: {
    request: (url, id) => action(GET_LINK_PREVIEW.request, { url, id }),
    success: (preview, id) => action(GET_LINK_PREVIEW.success, { preview, id }),
    failure: (error) => action(GET_LINK_PREVIEW.failure, { error }),
    reset: () => action(GET_LINK_PREVIEW.reset),
    notFound: (id) => action(LINK_PREVIEW_NOT_FOUND, { id }),
  },
};
