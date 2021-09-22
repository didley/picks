const createRequestTypes = (base, additional) => ({
  request: `${base}_REQUEST`,
  success: `${base}_SUCCESS`,
  failure: `${base}_FAILURE`,
  reset: `${base}_RESET`,
  ...additional, // eg. { key : "_KEY" }
});

// profile summary
export const GET_PROFILE_SUMMARY = createRequestTypes("profile/getSummary");
export const UPDATE_PROFILE_SUMMARY = createRequestTypes(
  "profile/updateSummary"
);

// card
export const GET_CARDS = createRequestTypes("card/getCards");
export const GET_CARD = createRequestTypes("card/getCards");
export const CREATE_CARD = createRequestTypes("card/createCard");
export const DELETE_CARD = createRequestTypes("card/deleteCard");
export const UPDATE_CARD = createRequestTypes("card/updateCard");

// card draft
export const SET_CREATING = "cardDraft/setCreating";
export const SET_EDITING = "cardDraft/setEditing";
export const CLEAR_DRAFT = "cardDraft/clear";
export const CHANGE_DRAFT = "cardDraft/change";
export const DRAFT_PICK = {
  add: "cardDraft/addPick",
  remove: "cardDraft/removePick",
  move: "cardDraft/move",
};
export const GET_LINK_PREVIEW = createRequestTypes("cardForm/getLinkPreview");
export const LINK_PREVIEW_NOT_FOUND = "cardForm/linkPreviewNotFound";
