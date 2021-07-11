const createRequestTypes = (base) => ({
  request: `${base}_REQUEST`,
  success: `${base}_SUCCESS`,
  failure: `${base}_FAILURE`,
  reset: `${base}_RESET`,
});

// card
export const GET_CARDS = createRequestTypes("card/getCards");
export const GET_CARD = createRequestTypes("card/getCards");
export const CREATE_CARD = createRequestTypes("card/createCard");
export const DELETE_CARD = createRequestTypes("card/deleteCard");
export const EDIT_CARD = createRequestTypes("card/editCard");
export const ADD_PICK = createRequestTypes("card/addPick");
export const EDIT_PICK = createRequestTypes("card/editPick");
export const DELETE_PICK = createRequestTypes("card/deletePick");
