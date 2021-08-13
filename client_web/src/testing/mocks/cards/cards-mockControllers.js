import { v4 as uuidv4 } from "uuid";
import { CardsResponse } from "testing/stubs/cards";

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
        data: CardsResponse(),
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
