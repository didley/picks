const createRequestTypes = (base) => ({
  request: `${base}_REQUEST`,
  success: `${base}_SUCCESS`,
  failure: `${base}_FAILURE`,
  reset: `${base}_RESET`,
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
// export const ADD_PICK = createRequestTypes("card/addPick");
// export const EDIT_PICK = createRequestTypes("card/editPick");
// export const DELETE_PICK = createRequestTypes("card/deletePick");

export const CARD_FORM = {
  create: { show: "cardForm/showCreateForm", hide: "cardForm/hideCreateForm" },
  edit: { set: "cardForm/setEditable", clear: "cardForm/clearEditable" },
};
export const SET_PICKS = "cardForm/setPicks";
export const ADD_PICK = "cardForm/addPick";
export const REMOVE_PICK = "cardForm/removePick";
export const GET_LINK_PREVIEW = createRequestTypes("cardForm/getLinkPreview");
export const LINK_PREVIEW_NOT_FOUND = "cardForm/linkPreviewNotFound";
