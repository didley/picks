import { useGenericCRUD } from "../useGenericCRUD";
import { Card } from "./card.model";
import { User } from "../user/user.model";
import httpErr from "http-errors";

const generic = useGenericCRUD(Card);

//    * if has id query string findOne by id
//    * if has user query string findMany by userName
//    * if no query string return findMany by userId
//    */

const getAllCards = (req, res, next) => generic.getMany(req, res, next);

const getCardsByUsername = async (req, res, next) => {
  const { un: usernameQueryString } = req.query;

  try {
    const user = await User.findOne({ username: usernameQueryString });
    const docs = await Card.find({ createdBy: user._id })
      .sort("-createdAt")
      .populate("createdBy", "username -_id");

    res.status(200).json({ data: docs });
  } catch (err) {
    next(httpErr(400, err));
  }
};

const createCard = (req, res, next) => generic.createOne(req, res, next);

const getCardById = (req, res, next) =>
  generic.getOne(req, res, next, { idReqType: "query" });

const updateCard = (req, res, next) =>
  generic.updateOne(req, res, next, { idReqType: "body" });

const deleteCardById = (req, res, next) =>
  generic.removeOne(req, res, next, { idReqType: "query" });

export default {
  getAllCards,
  getCardsByUsername,
  createCard,
  getCardById,
  updateCard,
  deleteCardById,
};
