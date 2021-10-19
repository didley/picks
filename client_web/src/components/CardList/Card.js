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
      <div
        className="relative border rounded-lg p-3 m-2 hover:border-purple-300 bg-white"
        onClick={(e) => {
          e.stopPropagation();
          nav(`/profile/${createdBy?.username}/${_id}`);
        }}
      >
        <div className="absolute md:bottom-0 right-0 mr-3 md:mr-6 md:mb-2">
          <ShareBtn
            shareData={{
              url: createLink(`/profile/${createdBy?.username}/${_id}`),
              title: `${createdBy?.username} Picks`,
              test: `${comments}`,
            }}
          >
            <small className="text-green-400 font-bold">share</small>
          </ShareBtn>
          {isOwnCard && (
            <button
              className="ml-2 text-sm text-gray-500 hover:text-purple-500"
              onClick={(e) => {
                e.stopPropagation();
                setEditable(card);
              }}
            >
              edit
            </button>
          )}
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="mb-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                nav(`/profile/${createdBy?.username}/`);
              }}
              className="hover:underline mb-2"
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
