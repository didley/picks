import { client } from "./_client";

export const getCardsByUsername = (username) =>
  client.get(`/cards?un=${username}`);

export const getCard = (cardId) => client.get(`/cards?id=${cardId}`);

export const createCard = (card) => client.post("/cards", { body: card });

export const updateCard = (cardUpdates) =>
  client.put("/cards", { body: cardUpdates });

export const deleteCard = (cardId) => client.delete(`/cards?id=${cardId}`);
