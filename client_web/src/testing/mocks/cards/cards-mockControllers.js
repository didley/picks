import { v4 as uuidv4 } from "uuid";

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
            tags: [],
            _id: "6107a062596422360b6afb48",
            comments: "dsfh",
            picks: [
              {
                likes: [],
                nsfw: false,
                _id: "6107a062596422360b6afb49",
                title: "asg",
                url: "http://wow.com",
                comments: "gfdsa",
                createdAt: "2021-08-02T07:36:02.548Z",
                updatedAt: "2021-08-02T07:36:02.548Z",
              },
            ],
            picksType: "topic",
            createdBy: {
              username: unParam,
            },
            createdAt: "2021-08-02T07:36:02.549Z",
            updatedAt: "2021-08-02T07:36:02.549Z",
            __v: 0,
          },
          {
            tags: [],
            _id: "61079f65596422360b6afb3a",
            comments: "sag",
            picks: [
              {
                likes: [],
                nsfw: false,
                _id: "61079f65596422360b6afb3b",
                title: "asdg",
                url: "http://sgaljk.com",
                comments: "asg",
                createdAt: "2021-08-02T07:31:49.544Z",
                updatedAt: "2021-08-02T07:31:49.544Z",
              },
            ],
            picksType: "topic",
            createdBy: {
              username: unParam,
            },
            createdAt: "2021-08-02T07:31:49.545Z",
            updatedAt: "2021-08-02T07:31:49.545Z",
            __v: 0,
          },
          {
            tags: [],
            _id: "61079ed46cabfb35ef3cef30",
            comments: "sadg",
            picks: [
              {
                likes: [],
                nsfw: true,
                _id: "61079ed46cabfb35ef3cef31",
                title: "sadg",
                url: "http://sadg.com",
                comments: "jlskjdgl;",
                createdAt: "2021-08-02T07:29:24.272Z",
                updatedAt: "2021-08-02T07:29:24.272Z",
              },
            ],
            picksType: "topic",
            createdBy: {
              username: unParam,
            },
            createdAt: "2021-08-02T07:29:24.273Z",
            updatedAt: "2021-08-02T07:29:24.273Z",
            __v: 0,
          },
          {
            tags: [],
            _id: "61027080a1ac0a420ba4c2d1",
            title: "",
            comments: "some cool links this week",
            picks: [
              {
                likes: [],
                nsfw: false,
                _id: "61027080a1ac0a420ba4c2d2",
                title: "ls(1) — Linux manual page",
                url: "https://man7.org/linux/man-pages/man1/ls.1.html",
                comments: "a really great link about fish",
                createdAt: "2021-07-29T09:11:10.322Z",
                updatedAt: "2021-07-29T09:11:10.322Z",
              },
              {
                likes: [],
                nsfw: true,
                _id: "61027080a1ac0a420ba4c2d3",
                title: "wow",
                url: "https://man7.org/linux/man-pages/man1/ls.1.html",
                comments: "so cool",
                createdAt: "2021-07-29T09:11:10.322Z",
                updatedAt: "2021-07-29T09:11:10.322Z",
              },
              {
                likes: [],
                nsfw: false,
                _id: "61027080a1ac0a420ba4c2d4",
                title: "How to cook eggs",
                url: "https://man7.org/linux/man-pages/man1/ls.1.html",
                comments: "",
                createdAt: "2021-07-29T09:11:10.322Z",
                updatedAt: "2021-07-29T09:11:10.322Z",
              },
              {
                likes: [],
                nsfw: false,
                _id: "610270aea1ac0a420ba4c2da",
                title: "womp",
                url: "https://man7.org/linux/man-pages/man1/ls.1.html",
                comments:
                  "asdfh asfh afsdh adfs dfsh dfs dgsjds sdfgj f gfgsdj sfgj fsgj sdfj sfdgj ",
                updatedAt: "2021-07-29T09:11:10.322Z",
                createdAt: "2021-07-29T09:11:10.322Z",
              },
              {
                likes: [],
                nsfw: true,
                _id: "610270aea1ac0a420ba4c2db",
                title: "sad gs ",
                url: "https://man7.org/linux/man-pages/man1/ls.1.html",
                comments: "dsfjhsdfgj",
                updatedAt: "2021-07-29T09:11:10.322Z",
                createdAt: "2021-07-29T09:11:10.322Z",
              },
            ],
            picksType: "topic",
            createdBy: {
              username: unParam,
            },
            createdAt: "2021-07-29T09:10:24.204Z",
            updatedAt: "2021-07-29T09:11:10.322Z",
            __v: 0,
          },
          {
            tags: ["cool", "stuff"],
            _id: "60fe9fa7835849cd84a8d2b7",
            picksType: "topic",
            title: "Some cool links today",
            comments: "2",
            picks: [
              {
                likes: [],
                nsfw: false,
                _id: "60fe9fa7835849cd84a8d2b8",
                title: "10 things every aspiring UX designer should know",
                url: "https://bootcamp.uxdesign.cc/10-things-every-aspiring-ux-designer-should-know-d786bff5004c",
                comments: "Wow I like this link, it is cool, a cool link",
                createdAt: "2021-07-26T11:42:31.892Z",
                updatedAt: "2021-07-26T11:42:31.892Z",
              },
            ],
            createdBy: {
              username: unParam,
            },
            createdAt: "2021-07-26T11:42:31.892Z",
            updatedAt: "2021-07-26T11:42:31.892Z",
            __v: 0,
          },
          {
            tags: ["cool", "stuff"],
            _id: "60fe9fa4835849cd84a8d2b3",
            picksType: "topic",
            title: "Some cool links today",
            comments: "1",
            picks: [
              {
                likes: [],
                nsfw: false,
                _id: "60fe9fa4835849cd84a8d2b4",
                title: "10 things every aspiring UX designer should know",
                url: "https://bootcamp.uxdesign.cc/10-things-every-aspiring-ux-designer-should-know-d786bff5004c",
                comments: "Wow I like this link, it is cool, a cool link",
                createdAt: "2021-07-26T11:42:28.203Z",
                updatedAt: "2021-07-26T11:42:28.203Z",
              },
            ],
            createdBy: {
              username: unParam,
            },
            createdAt: "2021-07-26T11:42:28.203Z",
            updatedAt: "2021-07-26T11:42:28.203Z",
            __v: 0,
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
