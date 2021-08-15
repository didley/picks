import { responseWrapper } from "./helpers/responseWrapper";
import { User } from "./user";

const { username } = User();

export const Card = (params = {}) =>
  responseWrapper({
    createdBy: { username },
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
  });
