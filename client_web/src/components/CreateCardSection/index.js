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
      handleHideCreateForm,
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
      <CardForm
        onCancelClick={handleHideCreateForm}
        onSubmit={this.handleCreateCardSubmit}
        isLoading={cardFormIsLoading}
      />
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
  handleHideCreateForm: card.form.create.hide,
})(CreateCardSection);
