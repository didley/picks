import { Picks, PicksResponse } from "./picks";

export const Card = (params = {}) => ({
  comments: "I've found some really interesting links this week",
  picks: Picks(),
  ...params,
});

export const CardResponse = (params = []) =>
  Card({ picks: PicksResponse(), ...params });
