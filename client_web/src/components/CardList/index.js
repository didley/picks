import React from "react";
import Card from "./Card";

const CardList = ({ cards, loggedInUsername }) => (
  <ul aria-label="card-list" className="max-w-6xl m-auto">
    {cards &&
      cards.map((card) => (
        <li key={card._id}>
          <Card card={card} loggedInUsername={loggedInUsername} />
        </li>
      ))}
  </ul>
);

export default CardList;
