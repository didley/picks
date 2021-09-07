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

export const selectFormPicks = (state) =>
  denormalize(state.profile.profileCards.form.picks);

export const selectCardFormVisibility = (state) =>
  state.profile.profileCards.form.visibility;

export const selectDraftCard = (state) => {
  const draft = state.profile.profileCards.draft;
  const editing = draft ? { editing: !!draft?.editingId } : null;

  if (draft?.picks) {
    const denormalisedPicks = denormalize(draft.picks);
    return { ...draft, picks: denormalisedPicks, ...editing };
  } else {
    return { ...draft, ...editing };
  }
};
