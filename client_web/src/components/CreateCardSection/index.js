import React from "react";
import { connect } from "react-redux";
import { selectDraftCard } from "reducers/selectors";
import { card } from "actions/cardActions";

import CardForm from "components/CardForm";

class CreateCardSection extends React.Component {
  render() {
    const { setCreating, draftCard } = this.props;

    if (draftCard && draftCard.editing === false) return <CardForm />;

    return (
      <button
        aria-label="create-post"
        onClick={() => setCreating()}
        className="m-auto my-2 rounded-lg bg-red-400 flex py-4 px-8 text-white text-xs"
      >
        + New Picks
      </button>
    );
  }
}

const mapState = (state) => ({
  draftCard: selectDraftCard(state),
});

export default connect(mapState, {
  setCreating: card.draft.set.creating,
})(CreateCardSection);
