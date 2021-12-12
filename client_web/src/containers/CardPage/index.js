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
      <div className="max-w-6xl m-auto">
        <div className="mx-2 my-2 sm:my-4">
          <button
            onClick={(e) => {
              nav(`/profile/${username}/`);
            }}
            className="select-none border border-gray-300 bg-white hover:bg-gray-50 shadow-sm active:shadow-inner active:drop-shadow-none rounded-full font-black text-gray-900 text-xl w-10 h-10"
          >
            ←
          </button>
          <h3 className="px-3 inline font-black">Picks</h3>
        </div>

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
