import React from "react";
import EditingPick from "./EditingPick";
import { connect } from "react-redux";
import { selectFormPicks } from "reducers/selectors";
import { card as cardActions } from "actions/cardActions";

class EditingPicks extends React.Component {
  render() {
    const { picks, addPick, removePick, handlePickChange } = this.props;

    return (
      <div>
        {picks.map((pick) => (
          <EditingPick
            pick={pick}
            key={pick._id}
            removePick={removePick}
            handlePickChange={handlePickChange}
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

const mapState = (state) => ({ picks: selectFormPicks(state) });

const mapDispatch = {
  addPick: cardActions.form.picks.add,
  removePick: cardActions.form.picks.remove,
  handlePickChange: cardActions.form.picks.update,
};

export default connect(mapState, mapDispatch)(EditingPicks);
