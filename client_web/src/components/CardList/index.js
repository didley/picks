import React from "react";
import Card from "./Card";

const CardList = ({ cards }) => (
  <ul className="max-w-6xl m-auto">
    {cards &&
      cards.map((card) => (
        <li key={card._id}>
          <Card card={card} />
        </li>
      ))}
  </ul>
);

export default CardList;
