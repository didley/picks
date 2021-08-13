import { Pick } from "./pick";
import { responseWrapper } from "./helpers/responseWrapper";

export const Picks = (params = []) => [
  Pick({
    title: "How to use picks",
    url: "http://howToPicks.com",
    comments: "such great article about creating picks",
    nsfw: false,
  }),
  Pick({
    title: "How to use picks",
    url: "http://howToPicks.com",
    comments: "such great article about creating picks",
    nsfw: false,
  }),
  Pick({
    title: "How to use picks",
    url: "http://howToPicks.com",
    comments: "such great article about creating picks",
    nsfw: true,
  }),
  ...params,
];

export const PicksResponse = (params = []) => responseWrapper(Picks(params));
