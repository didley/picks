import { denormalise } from "utils/normaliseArray";

export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;

export const getProfile = (state) => {
  const { cards, cardStatus, cardError, form } = state.profile.profileCards;
  const denormalisedCards = denormalise(cards);

  return {
    profileHeader: state.profile.profileHeader,
    profileCards: { cards: denormalisedCards, cardStatus, cardError, form },
  };
};

export const selectCard = (state) => state.card;

export const selectCardQueryIsLoading = (state) =>
  state.profile.profileCards.cardStatus.query === "loading";

export const selectCardMutationIsLoading = (state) =>
  state.profile.profileCards.cardStatus.mutation === "loading";

export const selectFormPicks = (state) =>
  denormalise(state.profile.profileCards.form.picks);

export const selectCardFormVisibility = (state) =>
  state.profile.profileCards.form.visibility;

export const selectDraftCard = (state) => {
  const draft = state.profile.profileCards.draft;
  const editing = draft ? { editing: !!draft?.editingId } : null;

  if (draft?.picks) {
    const denormalisedPicks = denormalise(draft.picks);
    return { ...draft, picks: denormalisedPicks, ...editing };
  } else {
    return { ...draft, ...editing };
  }
};
