import React from "react";
import ProfileHeader from "./ProfileHeader";
import PicksList from "./PicksList";
import { ExternalLink } from "components/ExternalLink";
import { parseDomain } from "utils/parseDomain";
import ShareIcon from "components/ShareIcon";
import { connect } from "react-redux";
import { card } from "actions/cardActions";
import { getEditingId } from "reducers/selectors";
import CardForm from "components/CardForm";

const PicksCards = ({ cards }) => (
  <ul className="max-w-6xl m-auto">
    {cards &&
      cards.map((card) => (
        <li key={card._id}>
          <Card card={card} />
        </li>
      ))}
  </ul>
);

class _Card extends React.Component {
  render() {
    const { card, editingId, setEditable, clearEditable } = this.props;
    const { title, createdBy, picksType, picks, comments, _id } = card;

    if (editingId === _id) {
      return (
        <div className="rounded-lg p-4 m-2 border-2 border-blue-500 text-xs ">
          <div className="flex justify-between">
            <h5 className="font-bold">Editing Pick</h5>
            <button onClick={clearEditable}>X</button>
          </div>
          <CardForm
            editingCard={card}
            onDelete={() => console.log({ _id })}
            onSubmit={(value) => console.log({ value })}
          />
        </div>
      );
    }

    return (
      <div className="relative border rounded-lg p-3 m-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <button
          className="absolute top-0 right-0 mr-3 md:mr-5 mt-4 md:mt-3 text-sm text-gray-500"
          onClick={() => setEditable(_id)}
        >
          Edit
        </button>
        <div className="mb-3">
          <small className="text-gray-500">UserName Picks #4</small>
          <br />
          <small>{comments}</small>
        </div>
        <hr className="md:hidden" />

        <Picks picks={picks} />
      </div>
    );
  }
}

const Card = connect((state) => ({ editingId: getEditingId(state) }), {
  setEditable: card.form.edit.set,
  clearEditable: card.form.edit.clear,
})(_Card);

const Picks = ({ picks }) => (
  <>
    {picks &&
      picks.map((pick) => (
        <li key={pick._id}>
          <Pick pick={pick} />
        </li>
      ))}
  </>
);

const Pick = ({ pick }) => {
  const { title, url, comments, nsfw, likes } = pick;

  return (
    <div className="grid my-2 border-l-2 border-red-400 px-2">
      <p>
        {nsfw && <small className="text-red-500 font-bold">NSFW </small>}
        <ExternalLink to={url}>{title}</ExternalLink>
      </p>
      <div className="flex justify-between">
        <small className="text-gray-500 inline-block align-middle">
          {parseDomain(url)}
        </small>
        <div>
          <button className="inline-block align-middle">
            <small className="text-red-400">♥︎</small>{" "}
            <small>{likes.length} </small>
          </button>
          <button className="w-5 inline-block align-middle">
            <ShareIcon />
          </button>
        </div>
      </div>
      {comments && <small>comments: {comments}</small>}
    </div>
  );
};
export default PicksCards;
