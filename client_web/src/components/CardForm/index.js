import React from "react";
import { connect } from "react-redux";
import EditingPicks from "./EditingPicks";
import { selectDraftCard, selectCardMutationStatus } from "reducers/selectors";
import { card } from "actions/cardActions";
import TagSection from "./TagSection";
class CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentsField: props.draftCard.comments ? true : false,
      deleteConfirmationActive: false,
    };
  }

  render() {
    const {
      draftCard,
      clearDraft,
      handleChange,
      setTags,
      deleteCard,
      updateCard,
      createCard,
      draftIsLoading,
      mutationStatus,
    } = this.props;
    const { deleteConfirmationActive, showCommentsField } = this.state;

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
      <div className="rounded-lg p-2 sm:p-4 m-2 border-2 border-purple-400 text-xs bg-white">
        <div className="flex justify-between">
          <h5 className="font-black">
            {draftCard.editing ? "Editing Picks" : "Creating Picks"}
          </h5>
          <button type="button" onClick={clearDraft}>
            Cancel
          </button>
        </div>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            {showCommentsField ? (
              <label>
                Card Comments
                <textarea
                  autoFocus
                  name="comments"
                  className="w-full max-w-sm block m-1 mb-4"
                  value={draftCard.comments}
                  onChange={handleCommentsChange}
                  onKeyDown={handleCommentKeyDown}
                />
              </label>
            ) : (
              <button
                onClick={() => this.setState({ showCommentsField: true })}
                className="text-left text-purple-500 mr-4 mb-2"
                type="button"
              >
                + Add Comments
              </button>
            )}
            <TagSection tagsState={draftCard.tags} tagsSetter={setTags} />
          </div>
          <hr className="my-4" />
          <h6 className="font-black">Picks</h6>

          {draftCard.picks && <EditingPicks />}

          <div className="flex justify-end">
            {draftIsLoading ? (
              <small className="text-gray-400 p-2 m-1">Loading...</small>
            ) : draftCard.editing ? (
              <>
                {deleteConfirmationActive ? (
                  <>
                    {mutationStatus !== "deleting" && (
                      <button
                        type="button"
                        className="border-2 p-2 rounded-md text-gray-400 border-gray-300 bg-white hover:bg-gray-100 mx-3 w-24"
                        disabled={!cardIsValid}
                        onClick={(s) =>
                          this.setState({
                            ...s,
                            deleteConfirmationActive: false,
                          })
                        }
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteCard(draftCard.editingId)}
                      className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-md w-24"
                    >
                      {mutationStatus === "deleting"
                        ? "Deleting..."
                        : "Delete Picks"}
                    </button>
                  </>
                ) : (
                  mutationStatus !== "updating" && (
                    <button
                      type="button"
                      onClick={(s) =>
                        this.setState({ ...s, deleteConfirmationActive: true })
                      }
                      className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white p-2 mx-3 rounded-md w-24"
                    >
                      Delete Picks
                    </button>
                  )
                )}

                {!deleteConfirmationActive && (
                  <button
                    type="submit"
                    className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white p-2 rounded-md disabled:text-gray-400 disabled:border-gray-300 disabled:bg-white w-24"
                    disabled={!cardIsValid}
                  >
                    {mutationStatus === "updating"
                      ? "Updating..."
                      : "Update Picks"}
                  </button>
                )}
              </>
            ) : (
              <button
                type="submit"
                disabled={!cardIsValid}
                className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white p-2 m-1 rounded-md disabled:text-gray-400 disabled:border-gray-300 disabled:bg-white w-24"
              >
                {mutationStatus === "creating" ? "Creating..." : "Create Picks"}
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
  mutationStatus: selectCardMutationStatus(state),
});

export default connect(mapState, {
  clearDraft: card.draft.clear,
  handleChange: card.draft.change,
  setTags: card.draft.setTags,
  deleteCard: card.delete.request,
  updateCard: card.update.request,
  createCard: card.create.request,
})(CardForm);
