import { User } from "./user";
import { Card, CardResponse } from "./card";
import { Pick } from "./pick";
import { responseWrapper } from "./helpers/responseWrapper";

const user = User();

const ownCard = { createdBy: { username: user.username } };

const notOwnedCard = { createdBy: { username: "Some_other_user" } };

export const Cards = (params = []) => [
  Card(ownCard, { picks: Pick() }),
  Card(notOwnedCard),
  Card(ownCard),
  ...params,
];

export const CardsResponse = (params = []) =>
  responseWrapper([
    CardResponse(ownCard),
    CardResponse(notOwnedCard),
    CardResponse(ownCard),
    ...params,
  ]);
