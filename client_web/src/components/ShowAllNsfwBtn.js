import React from "react";
import { connect } from "react-redux";
import { selectAllNsfwVisible } from "reducers/selectors";
import { card } from "actions/cardActions";

class ShowAllNsfwBtn extends React.Component {
  render() {
    const { allNsfwVisible, setAllNsfwVisibility } = this.props;

    const handleClick = () => {
      if (allNsfwVisible) setAllNsfwVisibility(false);
      else setAllNsfwVisibility(true);
    };

    return (
      <button
        aria-label="create-post"
        onClick={() => handleClick()}
        className="px-1 py-3 text-xs text-right text-gray-600 hover:underline"
      >
        {allNsfwVisible ? "Hide all NSFW" : "Show all NSFW"}
      </button>
    );
  }
}

export default connect(
  (state) => ({
    allNsfwVisible: selectAllNsfwVisible(state),
  }),
  { setAllNsfwVisibility: card.setAllNsfwVisibility }
)(ShowAllNsfwBtn);
