export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
export const getIsAuthenticating = (state) => state.auth.isAuthenticating;

export const getProfile = (state) => {
  const { cards, cardStatus, cardError } = state.profile.profileCards;
  const denormalizedCards = Object.values(cards);
  return { profileCards: { cards: denormalizedCards, cardStatus, cardError } };
};
