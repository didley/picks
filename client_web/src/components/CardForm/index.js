import React from "react";
import { connect } from "react-redux";
import EditingPicks from "./EditingPicks";
import {
  selectDraftCard,
  selectCardMutationIsLoading,
} from "reducers/selectors";
import { card } from "actions/cardActions";
class CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCommentsField: props.draftCard.comments ? true : false };
  }

  render() {
    const {
      draftCard,
      clearDraft,
      handleChange,
      deleteCard,
      updateCard,
      createCard,
      draftIsLoading,
      mutationIsLoading,
    } = this.props;

    const handleSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (draftCard.editing) {
        updateCard();
      } else {
        createCard();
      }
    };

    const hideCommentField = () => this.setState({ showCommentsField: false });

    const handleCommentsChange = (e) => {
      handleChange(e);
      if (e.target.value === "") hideCommentField();
    };

    const handleCommentKeyDown = (e) => {
      if (e.target.value === "") {
        const backspacePressed = e.keyCode === 8;
        const deletePressed = e.keyCode === 46;

        if (backspacePressed || deletePressed) hideCommentField();
      }
    };

    const checkCardIsValid = (card) => {
      const pickIsValid = (pick) => {
        if (pick.url) {
          const previewSucceeded = pick.status === "succeeded";
          const previewNotFound = pick.status === "notFound";
          return previewSucceeded || (previewNotFound && pick.userTitle)
            ? true
            : false;
        }
        return false;
      };
      const allPicksValid = card.picks.every(pickIsValid);
      return allPicksValid ? true : false;
    };
    const cardIsValid = checkCardIsValid(draftCard);

    if (!draftCard) return null;

    return (
      <div
        className="rounded-lg p-2 sm:p-4 m-2 border-2 border-purple-400 text-xs bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <h5 className="font-black">
            {draftCard.editing ? "Editing Picks" : "Creating Picks"}
          </h5>
          <button onClick={clearDraft}>Cancel</button>
        </div>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-2">
            {this.state.showCommentsField ? (
              <label>
                Card Comments
                <textarea
                  autoFocus
                  name="comments"
                  className="w-full"
                  value={draftCard.comments}
                  onChange={handleCommentsChange}
                  onKeyDown={handleCommentKeyDown}
                />
              </label>
            ) : (
              <button
                onClick={() => this.setState({ showCommentsField: true })}
                className="text-left text-purple-500"
                type="button"
              >
                + Add Comments
              </button>
            )}
          </div>

          <hr className="my-4" />
          <h6 className="font-black">Picks</h6>

          {draftCard.picks && <EditingPicks />}

          <div className="flex justify-end">
            {draftIsLoading ? (
              <small className="text-gray-400 p-2 m-1">Loading...</small>
            ) : draftCard.editing ? (
              <>
                <button
                  type="button"
                  onClick={() => deleteCard(draftCard.editingId)}
                  className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white p-2 mx-3 rounded-md"
                >
                  {mutationIsLoading ? "Deleting..." : "Delete Picks"}
                </button>

                <button
                  type="submit"
                  className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white p-2 rounded-md disabled:text-gray-400 disabled:border-gray-300 disabled:bg-white"
                  disabled={!cardIsValid}
                >
                  {mutationIsLoading ? "Updating..." : "Update Picks"}
                </button>
              </>
            ) : (
              <button
                type="submit"
                disabled={!cardIsValid}
                className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white p-2 m-1 rounded-md disabled:text-gray-400 disabled:border-gray-300 disabled:bg-white"
              >
                {mutationIsLoading ? "Creating..." : "Create Picks"}
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({
  draftCard: selectDraftCard(state),
  mutationIsLoading: selectCardMutationIsLoading(state),
});

export default connect(mapState, {
  clearDraft: card.draft.clear,
  handleChange: card.draft.change,
  deleteCard: card.delete.request,
  updateCard: card.update.request,
  createCard: card.create.request,
})(CardForm);
