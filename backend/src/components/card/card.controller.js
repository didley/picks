import { useGenericCRUD } from "../useGenericCRUD";
import { Card } from "./card.model";

const generic = useGenericCRUD(Card);

// const getCards = (req, res, next) => {
//   /**
//    * if has id query string findOne by id
//    * if has user query string findMany by userName
//    * if no query string return findMany by userId
//    */

//   const { id, user } = req.query;

//   export const getMany = (model) =>
//     asyncHandler(async (req, res, next, options) => {
//       try {
//         const docs = await model.find({ createdBy: req.user._id }); //.lean();
//         res.status(200).json({ data: docs });
//       } catch (err) {
//         throw httpErr(400, err);
//       }
//     });
// };

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
  // getCards,
  getAllCards,
  createCard,
  getCardById,
  updateCard,
  deleteCardById,
};
