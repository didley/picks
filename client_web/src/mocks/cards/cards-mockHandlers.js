import { rest } from "msw";
import { cardsMockControllers } from "./cards-mockControllers";

const { createCard, getCardsByUsername, updateCard, deleteCardById } =
  cardsMockControllers;

export const cardsMockHandlers = [
  rest.post("/api/cards", createCard),
  rest.get("/api/cards", getCardsByUsername),
  rest.put("/api/cards", updateCard),
  rest.delete("/api/cards", deleteCardById),
];
