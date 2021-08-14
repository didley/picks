import { v4 as uuidv4 } from "uuid";
import { Cards } from "testing/stubs/cards";

export const cardsMockControllers = {
  createCard: (req, res, ctx) => {
    req.body.createdBy = { username: "fakeUser1" };
    req.body._id = uuidv4();
    req.body.picks.map((pick) => (pick._id = uuidv4()));
    return res(ctx.delay(), ctx.json({ data: req.body }));
  },

  getCardsByUsername: (req, res, ctx) => {
    const unParam = req.url.searchParams.get("un");

    return res(
      ctx.delay(),
      ctx.json({
        data: [
          {
            _id: "1",
            createdBy: { username: unParam },
            comments: "I've found some really interesting links this week",
            picks: [
              {
                _id: "2",
                title: "How to use picks",
                url: "http://howToPicks.com",
                comments: "such great article about creating picks",
                nsfw: false,
              },
              {
                _id: "3",
                title: "How to use picks",
                url: "http://howToPicks.com",
                comments: "such great article about creating picks",
                nsfw: false,
              },
              {
                _id: "4",
                title: "How to use picks",
                url: "http://howToPicks.com",
                comments: "such great article about creating picks",
                nsfw: true,
              },
            ],
          },
          {
            _id: "5",
            createdBy: { username: "Some_other_user" },
            comments: "I've found some really interesting links this week",
            picks: [
              {
                _id: "6",
                title: "How to use picks",
                url: "http://howToPicks.com",
                comments: "such great article about creating picks",
                nsfw: false,
              },
              {
                _id: "7",
                title: "How to use picks",
                url: "http://howToPicks.com",
                comments: "such great article about creating picks",
                nsfw: false,
              },
              {
                _id: "8",
                title: "How to use picks",
                url: "http://howToPicks.com",
                comments: "such great article about creating picks",
                nsfw: true,
              },
            ],
          },
          {
            _id: "9",
            createdBy: { username: unParam },
            comments: "I've found some really interesting links this week",
            picks: [
              {
                _id: "10",
                title: "How to use picks",
                url: "http://howToPicks.com",
                comments: "such great article about creating picks",
                nsfw: false,
              },
              {
                _id: "11",
                title: "How to use picks",
                url: "http://howToPicks.com",
                comments: "such great article about creating picks",
                nsfw: false,
              },
              {
                _id: "12",
                title: "How to use picks",
                url: "http://howToPicks.com",
                comments: "such great article about creating picks",
                nsfw: true,
              },
            ],
          },
        ],
      })
    );
  },
  updateCard: (req, res, ctx) => {
    return res(ctx.delay(), ctx.json({ data: req.body }));
  },
  deleteCardById: (req, res, ctx) => {
    const idParam = req.url.searchParams.get("id");
    return res(ctx.delay(), ctx.json({ data: { _id: idParam } }));
  },
};
