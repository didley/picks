export const Pick = (params = {}) => ({
  title: "How to use picks",
  url: "http://howToPicks.com",
  comments: "such great article about creating picks",
  nsfw: true,
  ...params,
});
