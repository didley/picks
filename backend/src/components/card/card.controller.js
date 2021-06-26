import { genericControllers } from "../crud.controllers";
import { Card } from "./card.model";

const generic = genericControllers(Card);

const getAllCards = (req, res) => generic.getMany(req, res);

const createCard = (req, res) => generic.createOne(req, res);

const getCardById = (req, res) => generic.getOne(req, res);

const updateCard = (req, res) =>
  generic.updateOne(req, res, { idReqType: "body" });

const deleteCardById = (req, res) => generic.removeOne(req, res);

//  const getAllWeeklyCards = (...args) => {};

//  const getAllTopicCards = (...args) => {};

export default {
  getAllCards,
  createCard,
  getCardById,
  updateCard,
  deleteCardById,
};
