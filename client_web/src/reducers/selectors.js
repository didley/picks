export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
export const getIsAuthenticating = (state) => state.auth.isAuthenticating;

export const getProfile = (state) => {
  const { cards, cardStatus, cardError } = state.profile.profileCards;
  const cardsArray = Object.values(cards.cards);
  return { cards: cardsArray, cardStatus, cardError };
};
