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
export const UPDATE_CARD = createRequestTypes("card/updateCard");
// export const ADD_PICK = createRequestTypes("card/addPick");
// export const EDIT_PICK = createRequestTypes("card/editPick");
// export const DELETE_PICK = createRequestTypes("card/deletePick");

export const CARD_FORM = {
  create: { show: "card/showCreateForm", hide: "card/hideCreateForm" },
  edit: { set: "card/setEditable", clear: "card/clearEditable" },
};

export const GET_PROFILE_SUMMARY = createRequestTypes("profile/getSummary");

export const UPDATE_PROFILE_SUMMARY = createRequestTypes(
  "profile/updateSummary"
);

export const SET_PICKS = "picks/setPicks";
export const ADD_PICK = "picks/addPick";
export const REMOVE_PICK = "picks/removePick";
export const GET_LINK_PREVIEW = createRequestTypes("picks/getLinkPreview");
export const LINK_PREVIEW_NOT_FOUND = "picks/linkPreviewNotFound";
