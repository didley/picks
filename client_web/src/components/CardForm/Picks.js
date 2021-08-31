import React from "react";
import Pick from "./Pick";
import { connect } from "react-redux";
import { selectFormPicks } from "reducers/selectors";
import { card as cardActions } from "actions/cardActions";

class Picks extends React.Component {
  render() {
    const { picks, addPick, removePick, getLinkPreview } = this.props;
    return (
      <div>
        {picks.map((pick) => (
          <Pick
            pick={pick}
            key={pick._id}
            removePick={removePick}
            handleUrlChange={getLinkPreview}
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
  getLinkPreview: cardActions.form.picks.getLinkPreview.request,
};

export default connect(mapState, mapDispatch)(Picks);
