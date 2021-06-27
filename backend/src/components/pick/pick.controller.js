import { Card } from "../card/card.model";
import httpErr from "http-errors";
import asyncHandler from "express-async-handler";

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

const updatePick = asyncHandler(async (req, res, next) => {
  const createdBy = req.user._id;
  const { fromCard, _id } = req.body;
  try {
    const card = await Card.findOne({ createdBy, _id: fromCard });
    card.picks.id(_id).set(req.body);
    await card.validate();
    await card.save();
    const picksList = card?.picks || [];
    res.status(201).json({ data: picksList });
  } catch (err) {
    throw httpErr(400, err);
  }
});

const deletePick = asyncHandler(async (req, res, next) => {
  const createdBy = req.user._id;
  const { cardId, pickId } = req.query;
  try {
    const card = await Card.findOne({ createdBy, _id: cardId });
    card.picks.id(pickId).remove();
    await card.save();
    const picksList = card?.picks || [];
    res.status(201).json({ data: picksList });
  } catch (err) {
    throw httpErr(400, err);
  }
});

export default {
  addPick,
  updatePick,
  deletePick,
};
