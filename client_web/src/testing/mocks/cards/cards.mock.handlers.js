import { rest } from "msw";
import { cardsMockControllers } from "./cards.mock.controllers";

const {
  createCard,
  getCardsByUsername,
  updateCard,
  deleteCardById,
  getLinkPreview,
} = cardsMockControllers;

export const cardsMockHandlers = [
  rest.post("/api/cards", createCard),
  rest.get("/api/cards", getCardsByUsername),
  rest.put("/api/cards", updateCard),
  rest.delete("/api/cards", deleteCardById),
  rest.get("/api/picks/preview", getLinkPreview),
];
