import React from "react";
import { connect } from "react-redux";
import EditingPicks from "./EditingPicks";
import { selectDraftCard } from "reducers/selectors";
import { card } from "actions/cardActions";

class CardForm extends React.Component {
  render() {
    const {
      draftCard,
      clearDraft,
      handleChange,
      deleteCard,
      updateCard,
      createCard,
      draftIsLoading,
    } = this.props;

    const handleSubmit = (e) => {
      e.preventDefault();

      if (draftCard.editing) {
        updateCard();
      } else {
        createCard();
      }
    };

    if (!draftCard) return null;

    return (
      <div
        className="rounded-lg p-2 m-2 border-2 border-purple-400 text-xs bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <h5 className="font-bold">
            {draftCard.editing ? "Editing Post" : "Create a Post"}
          </h5>
          <button onClick={clearDraft}>Cancel</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-2">
            <label className="font-normal">
              Post Comments
              <textarea
                name="comments"
                className="w-full"
                value={draftCard.comments}
                onChange={handleChange}
              />
            </label>
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
                  className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white p-2 m-1 rounded-md"
                >
                  Delete Post
                </button>

                <button
                  type="submit"
                  className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white p-2 m-1 rounded-md"
                >
                  Update Post
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white p-2 m-1 rounded-md"
              >
                Post Picks
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
  // TODO draftIsLoading:
});

export default connect(mapState, {
  clearDraft: card.draft.clear,
  handleChange: card.draft.change,
  deleteCard: card.delete.request,
  updateCard: card.update.request,
  createCard: card.create.request,
})(CardForm);
