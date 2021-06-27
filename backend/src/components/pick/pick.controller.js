import { useGenericCRUD } from "../useGenericCRUD";
import { Card } from "../card/card.model";
// import { Pick } from "./pick.model";
import httpErr from "http-errors";
import asyncHandler from "express-async-handler";

// const generic = useGenericCRUD(Pick);

const addPick = asyncHandler(async (req, res, next) => {
  const createdBy = req.user._id;
  const { fromCard } = req.body;
  try {
    const card = await Card.findOne({ createdBy, _id: fromCard });
    card.picks.push(req.body);
    await card.save();
    const picksList = card?.picks || [];
    res.status(201).json({ data: picksList });
  } catch (err) {
    throw httpErr(400, err);
  }
});

// const deletePick = (req, res, next) =>
//   generic.removeOne(req, res, next, { idReqType: "query" });

// const updatePick = (req, res, next) =>
//   generic.updateOne(req, res, next, { idReqType: "body" });

export default {
  addPick,
  // deletePick,
  // updatePick
};
