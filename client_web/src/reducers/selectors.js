export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
export const getIsAuthenticating = (state) => state.auth.isAuthenticating;
export const selectUser = (state) => state.auth.user;

export const getProfile = (state) => {
  const { cards, cardStatus, cardError, form } = state.profile.profileCards;
  const denormalizedCards = Object.values(cards);
  return {
    profileCards: { cards: denormalizedCards, cardStatus, cardError, form },
  };
};

export const getEditingId = (state) =>
  state.profile.profileCards.form.editingId;

export const getCardFormIsLoading = (state) =>
  state.profile.profileCards.cardStatus === "loading" ? true : false;

// export getCardForm = (state) => {
//   state.profile.
// }
