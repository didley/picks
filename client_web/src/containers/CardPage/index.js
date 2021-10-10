import React from "react";
import { connect } from "react-redux";
import { card } from "actions/cardActions";
import { selectCard, selectUser } from "reducers/selectors";
import Card from "components/CardList/Card";

class ProfilePage extends React.Component {
  componentDidMount() {
    const { username, cardId } = this.props.match.params;
    this.props.getCard(cardId);
  }

  render() {
    const { user, card } = this.props;

    return (
      <div className="max-w-6xl m-auto">
        <h1>Card</h1>

        {card.status === "loading" && <small>Loading card...</small>}

        {card.status === "succeeded" && (
          <div aria-label={`card by ${card?.createdBy?.username}`}>
            <Card card={card.data} loggedInUsername={user?.username} />
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  user: selectUser(state),
  card: selectCard(state),
});

export default connect(mapState, {
  getCard: card.get.request,
})(ProfilePage);
