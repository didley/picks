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
  state.profile.profileCards.form.visibility.editingId;

export const getCardFormIsLoading = (state) =>
  state.profile.profileCards.cardStatus === "loading";

export const selectFormPicks = (state) =>
  denormalize(state.profile.profileCards.form.picks);

export const selectCardFormVisibility = (state) =>
  state.profile.profileCards.form.visibility;
