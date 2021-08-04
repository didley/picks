import { rest } from "msw";
import { cardsMockControllers } from "./cards-mockControllers";

const { createCard, getCardsByUsername } = cardsMockControllers;

export const cardsMockHandlers = [
  rest.post("/api/cards", createCard),
  rest.get("/api/cards", getCardsByUsername),
];
