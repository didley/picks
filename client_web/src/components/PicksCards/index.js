import ProfileHeader from "./ProfileHeader";
import PicksList from "./PicksList";
import { ExternalLink } from "components/ExternalLink";
import { parseDomain } from "utils/parseDomain";
import ShareIcon from "components/ShareIcon";

const PicksCards = ({ cards }) => (
  <ul>
    {cards &&
      cards.map((card) => (
        <li key={card._id}>
          <Card card={card} />
        </li>
      ))}
  </ul>
);

const Card = ({ card }) => {
  const { title, createdBy, picksType, picks, comments } = card;
  return (
    <div className="border rounded-lg w-1/2 p-4 m-4">
      <div className="flex justify-between">
        <h5 className="inline-block align-middle">{title}</h5>
        <small className="inline-block align-middle text-gray-500">
          UNPlaceholder
        </small>
      </div>
      <small>{comments}</small>
      <hr className="my-4" />
      <Picks picks={picks} />
    </div>
  );
};

const Picks = ({ picks }) => (
  <ul>
    {picks &&
      picks.map((pick) => (
        <li key={pick._id}>
          <Pick pick={pick} />
        </li>
      ))}
  </ul>
);

const Pick = ({ pick }) => {
  const { title, url, comments, nsfw, likes } = pick;

  return (
    <div className="grid m-2">
      <p>
        {nsfw && <small className="text-red-500 font-bold">NSFW </small>}
        <ExternalLink to={url}>{title}</ExternalLink>
      </p>
      <small>comments: {comments}</small>
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
    </div>
  );
};
export default PicksCards;
