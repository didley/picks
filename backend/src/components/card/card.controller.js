import { genericControllers } from "../crud.controllers";
import { Card } from "./card.model";

const generic = genericControllers(Card);

const getAllCards = (req, res, next) => generic.getMany(req, res, next);

const createCard = (req, res, next) => generic.createOne(req, res, next);

const getCardById = (req, res, next) =>
  generic.getOne(req, res, next, { idReqType: "query" });

const updateCard = (req, res, next) =>
  generic.updateOne(req, res, next, { idReqType: "body" });

const deleteCardById = (req, res, next) =>
  generic.removeOne(req, res, next, { idReqType: "query" });

//  const getAllWeeklyCards = (...args) => {};

//  const getAllTopicCards = (...args) => {};

export default {
  getAllCards,
  createCard,
  getCardById,
  updateCard,
  deleteCardById,
};
