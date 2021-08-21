const denormalize = (normalizedObject) => Object.values(normalizedObject);

export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
export const getIsAuthenticating = (state) => state.auth.isAuthenticating;
export const selectUser = (state) => state.auth.user;

export const getProfile = (state) => {
  const { cards, cardStatus, cardError, form } = state.profile.profileCards;
  const denormalizedCards = denormalize(cards);

  return {
    profileHeader: state.profile.profileHeader,
    profileCards: { cards: denormalizedCards, cardStatus, cardError, form },
  };
};

export const getEditingId = (state) =>
  state.profile.profileCards.form.editingId;

export const getCardFormIsLoading = (state) =>
  state.profile.profileCards.cardStatus === "loading";

export const selectPicks = (state) =>
  denormalize(state.profile.profileCards.picks);

// export getCardForm = (state) => {
//   state.profile.
// }
