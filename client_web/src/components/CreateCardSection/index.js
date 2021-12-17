import React from "react";
import { connect } from "react-redux";
import { selectDraftCard } from "reducers/selectors";
import { card } from "actions/cardActions";

import CardForm from "components/CardForm";
import ShowAllNsfwBtn from "components/ShowAllNsfwBtn";

class CreateCardSection extends React.Component {
  render() {
    const { setCreating, draftCard, isOwnProfile } = this.props;

    if (draftCard && draftCard.editing === false) return <CardForm />;

    return (
      <div className="grid grid-flow-row grid-cols-3 mx-2 justify-center auto-cols-fr">
        {isOwnProfile && (
          <div className="col-start-2 justify-self-center">
            <button
              aria-label="create-post"
              onClick={() => setCreating()}
              className="m-auto my-2 rounded-lg border border-green-400 text-green-400 hover:bg-green-100 bg-white py-3 px-4  text-xs"
            >
              Create Picks
            </button>
          </div>
        )}
        <ShowAllNsfwBtn />
      </div>
    );
  }
}

const mapState = (state) => ({
  draftCard: selectDraftCard(state),
});

export default connect(mapState, {
  setCreating: card.draft.set.creating,
})(CreateCardSection);
