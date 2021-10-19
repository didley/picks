import React from "react";
import Card from "./Card";

const CardList = ({ cards, loggedInUsername, isLoading }) => {
  if (isLoading) {
    return <small>Loading cards...</small>;
  }

  return (
    <ul aria-label="card-list" className="max-w-6xl m-auto pb-1">
      {cards &&
        cards.map((card) => (
          <li
            key={card._id}
            aria-label={`card by ${card?.createdBy?.username}`}
          >
            <Card card={card} loggedInUsername={loggedInUsername} />
          </li>
        ))}
    </ul>
  );
};

export default CardList;
