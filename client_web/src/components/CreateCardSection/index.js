import React from "react";
import { connect } from "react-redux";
import {
  getCardFormIsLoading,
  selectCardFormVisibility,
  selectFormPicks,
} from "reducers/selectors";
import { card } from "actions/cardActions";

import CardForm from "components/CardForm";

class CreateCardSection extends React.Component {
  handleCreateCardSubmit = (localFormState) => {
    const { formPicks, createCard } = this.props;
    const picksStrippedIds = formPicks.map(({ _id, ...rest }) => rest);

    createCard({
      comments: localFormState.comments,
      picks: picksStrippedIds,
    });
  };

  render() {
    const {
      cardFormVisibility,
      cardFormIsLoading,
      showCreateForm,
      hideCreateForm,
    } = this.props;

    if (!cardFormVisibility.createFormVisible) {
      return (
        <button
          aria-label="create-post"
          onClick={showCreateForm}
          className="m-auto my-2 rounded-lg bg-red-400 flex py-4 px-8 text-white text-xs"
        >
          + New Picks
        </button>
      );
    }

    return (
      <div className="rounded-lg p-4 m-2 border-2 border-blue-500 text-xs">
        <div className="flex justify-between">
          <h5 className="font-bold">Create a picks post</h5>
          <button onClick={hideCreateForm}>Cancel</button>
        </div>
        <CardForm
          onSubmit={this.handleCreateCardSubmit}
          isLoading={cardFormIsLoading}
        />
      </div>
    );
  }
}

const mapState = (state) => ({
  cardFormVisibility: selectCardFormVisibility(state),
  cardFormIsLoading: getCardFormIsLoading(state),
  formPicks: selectFormPicks(state),
});

export default connect(mapState, {
  createCard: card.create.request,
  showCreateForm: card.form.create.show,
  hideCreateForm: card.form.create.hide,
})(CreateCardSection);
