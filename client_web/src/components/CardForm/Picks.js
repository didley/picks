import React from "react";
import Pick from "./Pick";
import { connect } from "react-redux";
import { selectPicks } from "reducers/selectors";
import { picks } from "actions/pickActions";
import { getLinkPreview } from "utils/apiCalls/picks";

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

// const Picks = ({ picks }) => {
//   return picks.map((pick) => <Pick pick={pick} key={pick._id} />);
// };

const mapState = (state) => ({ picks: selectPicks(state) });

const mapDispatch = {
  addPick: picks.add,
  removePick: picks.remove,
  getLinkPreview: picks.getLinkPreview.request,
};

export default connect(mapState, mapDispatch)(Picks);
