export const Card = (params = {}) => ({
  comments: "I love all of these links",
  picks: [
    {
      title: "How to use picks",
      url: "http://howToPicks.com",
      comments: "such great article about creating picks",
      nsfw: true,
    },
  ],
  ...params,
});
