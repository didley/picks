import React from "react";
import EditingPick from "./EditingPick";
import { connect } from "react-redux";
import { selectDraftCard } from "reducers/selectors";
import { card as cardActions } from "actions/cardActions";

class EditingPicks extends React.Component {
  render() {
    const { draftCard, addPick, removePick, handleChange } = this.props;

    const { picks } = draftCard;

    return (
      <div>
        {picks.map((pick) => (
          <EditingPick
            pick={pick}
            key={pick._id}
            removePick={() => removePick(pick._id)}
            onChange={(e) => handleChange(e, pick._id)}
          />
        ))}
        {picks.length < 5 ? (
          <button
            type="button"
            className="bg-blue-400 text-white rounded-md w-full my-4 p-2 text-center"
            onClick={() => addPick()}
          >
            {`Add Pick ${picks.length + 1} of 5`}
          </button>
        ) : (
          <div className="bg-gray-300 text-white rounded-md w-full my-4 p-2 text-center">
            <small className="text-white">Total 5 picks created</small>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({ draftCard: selectDraftCard(state) });

const mapDispatch = {
  addPick: cardActions.draft.pick.add,
  removePick: cardActions.draft.pick.remove,
  handleChange: cardActions.draft.change,
};

export default connect(mapState, mapDispatch)(EditingPicks);
