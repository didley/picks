import React from "react";
import { connect } from "react-redux";
import { selectDraftCard } from "reducers/selectors";
import { card } from "actions/cardActions";
import CardForm from "components/CardForm";
import PickList from "../PickList";
import { nav, createLink } from "utils/history";
import ShareBtn from "components/ShareBtn";

class Card extends React.Component {
  render() {
    const { loggedInUsername, card, draftCard, setEditable } = this.props;

    const { createdBy, picks, comments, _id } = card;

    const isOwnCard = loggedInUsername === createdBy.username;

    if (draftCard?.editingId === _id) {
      return <CardForm />;
    }

    return (
      <div className="relative border rounded-lg p-3 m-2">
        <div className="absolute md:bottom-0 right-0 mr-3 md:mr-6 mt-2 md:mb-2">
          <ShareBtn
            shareData={{
              url: createLink(`/profile/${createdBy?.username}/${_id}`),
            }}
          />
          {isOwnCard && (
            <button
              className="ml-2 text-sm text-gray-500"
              onClick={() => setEditable(card)}
            >
              Edit
            </button>
          )}
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="mb-3">
            <button
              onClick={() => nav(`/profile/${createdBy?.username}`)}
              className="hover:underline"
            >
              <small className="text-gray-500">{createdBy?.username}</small>
            </button>
            <br />
            <small>{comments}</small>
            <hr className="md:hidden" />
          </div>
          <PickList picks={picks} />
        </ul>
      </div>
    );
  }
}

export default connect((state) => ({ draftCard: selectDraftCard(state) }), {
  setEditable: card.draft.set.editing,
})(Card);
