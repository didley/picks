import React from "react";
import EditingPick from "./EditingPick";
import { connect } from "react-redux";
import { selectDraftCard } from "reducers/selectors";
import { card as cardActions } from "actions/cardActions";

class EditingPicks extends React.Component {
  render() {
    const { draftCard, addPick, removePick, handleChange, movePick } =
      this.props;

    const { picks } = draftCard;

    const handleMoveUp = (pickIndex) => {
      if (pickIndex === 0) return;
      movePick(picks[pickIndex]._id, picks[pickIndex - 1]._id);
    };
    const handleMoveDown = (pickIndex) => {
      if (picks.length - 1 === pickIndex) return;
      movePick(picks[pickIndex]._id, picks[pickIndex + 1]._id);
    };

    return (
      <div>
        {picks.map((pick, index) => (
          <EditingPick
            pick={pick}
            key={pick._id}
            removePick={() => removePick(pick._id)}
            onMoveUp={() => handleMoveUp(index)}
            onMoveDown={() => handleMoveDown(index)}
            onChange={(e) => handleChange(e, pick._id)}
            isFirstPick={index === 0}
            isLastPick={index === picks.length - 1}
            isOnlyPick={picks.length === 1}
          />
        ))}
        {picks.length < 5 ? (
          <button
            type="button"
            className="bg-purple-500 text-white rounded-md w-full my-4 p-2 text-center"
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
  movePick: cardActions.draft.pick.move,
};

export default connect(mapState, mapDispatch)(EditingPicks);
