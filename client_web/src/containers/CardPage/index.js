import React from "react";
import { connect } from "react-redux";
import { card } from "actions/cardActions";
import { selectCard, selectUser } from "reducers/selectors";
import Card from "components/CardList/Card";
import { nav } from "utils/history";

class ProfilePage extends React.Component {
  componentDidMount() {
    const { cardId } = this.props.match.params;
    this.props.getCard(cardId);
  }

  render() {
    const { user, card } = this.props;
    const { username } = this.props.match.params;

    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          nav(`/profile/${username}/`);
        }}
        className="max-w-6xl m-auto"
      >
        <h3 className="hover:underline">{`← ${username} profile`}</h3>

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
