import { User } from "./user";
import { Card, CardResponse } from "./card";
import { Pick } from "./pick";
import { responseWrapper } from "./helpers/responseWrapper";

const user = User();

const ownCard = { username: user.username };

const notOwnedCard = { username: "Some_other_user" };

export const Cards = (params = []) =>
  responseWrapper([
    {
      createdBy: ownCard,
      comments: "I've found some really interesting links this week",
      picks: responseWrapper([
        {
          title: "How to use picks",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks",
          nsfw: false,
        },
        {
          title: "How to use picks",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks",
          nsfw: false,
        },
        {
          title: "How to use picks",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks",
          nsfw: true,
        },
      ]),
      ...params,
    },
    {
      createdBy: notOwnedCard,
      comments: "I've found some really interesting links this week",
      picks: responseWrapper([
        {
          title: "How to use picks",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks",
          nsfw: false,
        },
        {
          title: "How to use picks",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks",
          nsfw: false,
        },
        {
          title: "How to use picks",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks",
          nsfw: true,
        },
      ]),
      ...params,
    },
    {
      createdBy: ownCard,
      comments: "I've found some really interesting links this week",
      picks: responseWrapper([
        {
          title: "How to use picks",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks",
          nsfw: false,
        },
        {
          title: "How to use picks",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks",
          nsfw: false,
        },
        {
          title: "How to use picks",
          url: "http://howToPicks.com",
          comments: "such great article about creating picks",
          nsfw: true,
        },
      ]),
      ...params,
    },
    ...params,
  ]);
