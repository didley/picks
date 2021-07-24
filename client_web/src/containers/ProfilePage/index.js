import React from "react";
import { connect } from "react-redux";
import { card } from "actions/cardActions";
import { getProfile, getCardFormIsLoading } from "reducers/selectors";
import PicksCards from "components/PicksCards";
import CardForm from "components/CardForm";

class ProfilePage extends React.Component {
  componentDidMount() {
    this.props.getAllCards();
  }

  handleSubmit = (card) => {
    card.picksType = "topic"; // replace when weekly/topic types implements
    this.props.createCard(card);
  };

  render() {
    const {
      cards,
      form: { createFromVisible },
    } = this.props.profile.profileCards;

    const { showCreateForm, hideCreateForm, setEditable, isLoading } =
      this.props;

    return (
      <div className="max-w-6xl m-auto">
        <div className="max-w-6xl m-auto">
          {createFromVisible ? (
            <div className="rounded-lg p-4 m-2 border-2 border-blue-500 text-xs">
              <div className="flex justify-between">
                <h5 className="font-bold">Create a picks post</h5>
                <button onClick={hideCreateForm}>X</button>
              </div>
              <CardForm onSubmit={this.handleSubmit} isLoading={isLoading} />
            </div>
          ) : (
            <button
              onClick={showCreateForm}
              className="m-auto my-2 rounded-lg bg-red-400 flex py-4 px-8 text-white text-xs"
            >
              + New Picks
            </button>
          )}
        </div>

        <PicksCards cards={cards} handleEditClick={setEditable} />
      </div>
    );
  }
}

const mapState = (state) => ({
  profile: getProfile(state),
  isLoading: getCardFormIsLoading(state),
});

export default connect(mapState, {
  getAllCards: card.getAll.request,
  createCard: card.create.request,
  showCreateForm: card.form.create.show,
  hideCreateForm: card.form.create.hide,
  setEditable: card.form.edit.set,
  clearEditable: card.form.edit.clear,
})(ProfilePage);
