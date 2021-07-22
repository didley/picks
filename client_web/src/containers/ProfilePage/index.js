import React from "react";
import { connect } from "react-redux";
import { card } from "actions/cardActions";
import { getProfile } from "reducers/selectors";
import PicksCards from "components/PicksCards";
import CardForm from "components/CardForm";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCreateForm: true };
  }

  componentDidMount() {
    this.props.getAllCards();
  }

  handleShowCreateForm = () => this.setState({ showCreateForm: true });

  handleHideCreateForm = () => this.setState({ showCreateForm: false });

  handleSubmit = (card) => {
    card.picksType = "topic"; // replace when weekly/topic types implements
    this.props.createCard(card);

    this.handleHideCreateForm();
  };

  render() {
    const { cards, status, error } = this.props.profile.profileCards;
    const { showCreateForm } = this.state;

    return (
      <div>
        {showCreateForm ? (
          <div className="rounded-lg w-1/2 p-4 m-4 border-2 border-blue-500 text-xs">
            <div className="flex justify-between">
              <h5>Create a picks post</h5>
              <button onClick={this.handleHideCreateForm}>X</button>
            </div>
            <CardForm onSubmit={this.handleSubmit} />
          </div>
        ) : (
          <button
            onClick={this.handleShowCreateForm}
            className="border rounded-lg w-1/2 p-4 m-4 bg-red-400 text-xs"
          >
            + Create
          </button>
        )}
        <div>
          <PicksCards cards={cards} />
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  profile: getProfile(state),
});

export default connect(mapState, {
  getAllCards: card.getAll.request,
  createCard: card.create.request,
})(ProfilePage);
