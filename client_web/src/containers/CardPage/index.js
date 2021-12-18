import React from "react";
import { connect } from "react-redux";
import { card } from "actions/cardActions";
import { selectCard, selectUser } from "reducers/selectors";
import Card from "components/CardList/Card";
import { nav } from "utils/history";
import { Redirect } from "react-router-dom";
import ShowAllNsfwBtn from "components/ShowAllNsfwBtn";

class CardPage extends React.Component {
  componentDidMount() {
    const { cardId } = this.props.match.params;
    this.props.getCard(cardId);
  }

  render() {
    const { user, card } = this.props;
    const { username } = this.props.match.params;

    if (card.status === "deleted" || card.status === "failed") {
      this.props.resetCard();
      return <Redirect to={`/profile/${username}`} />;
    }

    return (
      <div className="max-w-6xl m-auto">
        <div className="grid mx-2 my-2 sm:my-4">
          <div>
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
          <ShowAllNsfwBtn />
        </div>
        {card.status === "loading" && <small>Loading card...</small>}

        {card.status === "succeeded" && (
          <div aria-label={`card by ${card?.createdBy?.username}`}>
            <Card
              card={card.data}
              loggedInUsername={user?.username}
              hoverDisabled
            />
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
  resetCard: card.get.reset,
})(CardPage);
