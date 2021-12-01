import { uuid } from "utils/uuid";
import { getCardByUsernameStub } from "./cards.mock.stubs";

export const cardsMockControllers = {
  createCard: (req, res, ctx) => {
    req.body.createdBy = { username: "fakeUser1" };
    req.body._id = uuid();
    req.body.picks.map((pick) => (pick._id = uuid()));
    return res(ctx.delay(), ctx.json({ data: req.body }));
  },

  getCardsByUsername: (req, res, ctx) => {
    const unParam = req.url.searchParams.get("un");

    return res(ctx.delay(), ctx.json(getCardByUsernameStub(unParam)));
  },
  updateCard: (req, res, ctx) => {
    return res(ctx.delay(), ctx.json({ data: req.body }));
  },
  deleteCardById: (req, res, ctx) => {
    const idParam = req.url.searchParams.get("id");
    return res(ctx.delay(), ctx.json({ data: { _id: idParam } }));
  },
  getLinkPreview: (req, res, ctx) => {
    const preview = {
      data: {
        ogType: "article",
        ogTitle: `Mock preview`,
        ogLocale: "en",
        ogImageUrl: "https://miro.medium.com/max/1200/0*fNOHp2Ep8z9pwRnr",
        ogDescription: "Mock preview description",
      },
    };

    return res(ctx.json(preview));
  },
};
