export const userMockControllers = {
  loginUser: (req, res, ctx) => {
    return res(
      ctx.json({
        token: "fakeToken207v09-sf7gjsfljfglhjd-0dfhlkj",
        user: { username: "fakeUser1", email: "fakeUser1@gmail.com" },
      })
    );
  },

  registerUser: (req, res, ctx) => {
    return res(
      ctx.json({
        token: "fakeToken207v09-sf7gjsfljfglhjd-0dfhlkj",
        user: { username: "fakeUser1", email: "fakeUser1@gmail.com" },
      })
    );
  },

  getUser: (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          _id: "fakeIdf7gjsfljfglhjd0dfhlkj",
          username: "fakeUser1",
          email: "fakeUser1@gmail.com",
        },
      })
    );
  },

  getProfileSummary: (req, res, ctx) => {
    const unParam = req.url.searchParams.get("un");
    return res(
      ctx.json({
        data: {
          username: unParam,
          bio: "Sharing cool web dev links",
          location: "Melbourne, Vic",
          name: "Fake user",
        },
      })
    );
  },

  updateProfileSummary: (req, res, ctx) => {
    const { name, bio, location } = req.body;

    return res(
      ctx.json({
        data: {
          name,
          bio,
          location,
        },
      })
    );
  },
};
