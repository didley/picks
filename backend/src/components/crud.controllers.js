import chalk from "chalk";
import asyncHandler from "express-async-handler";
import httpErr from "http-errors";

// generic CRUD controllers, supply supply model as argument

const _handleIdReqTypeOpt = (optsObj = {}) => {
  const PARAMS = "params";
  const QUERY = "query";
  const BODY = "body";

  const { idReqType = PARAMS } = optsObj;

  switch (idReqType) {
    case QUERY:
    case PARAMS:
      return [idReqType, "id"];
    case BODY:
      return [idReqType, "_id"];

    default:
      console.error(`
      ${chalk.red.bold(
        "Error: "
      )}idReqType option must be query | body | params, ${chalk.red(
        idReqType
      )} was supplied.
      `);
  }
};

export const getMany = (model) =>
  asyncHandler(async (req, res, next, options) => {
    try {
      const docs = await model.find({ createdBy: req.user._id }).lean();
      res.status(200).json({ data: docs });
    } catch (err) {
      throw httpErr(400, err);
    }
  });

export const createOne = (model) =>
  asyncHandler(async (req, res, next, options) => {
    const createdBy = req.user._id;
    try {
      const doc = await model.create({ ...req.body, createdBy });
      res.status(201).json({ data: doc });
    } catch (err) {
      throw httpErr(400, err);
    }
  });

export const getOne = (model) =>
  asyncHandler(async (req, res, next, options) => {
    const [idReqType, id] = _handleIdReqTypeOpt(options);

    console.log({ idReqType, id });

    try {
      const doc = await model
        .findOne({ createdBy: req.user._id, _id: req[idReqType][id] })
        .lean()
        .exec();

      if (!doc) {
        return res.status(400).end();
      }

      res.status(200).json({ data: doc });
    } catch (err) {
      throw httpErr(400, err);
    }
  });

export const updateOne = (model) =>
  asyncHandler(async (req, res, next, options) => {
    const [idReqType, id] = _handleIdReqTypeOpt(options);

    try {
      const updatedDoc = await model
        .findOneAndUpdate(
          {
            createdBy: req.user._id,
            _id: req[idReqType][id],
          },
          req.body,
          { new: true }
        )
        .lean();

      if (!updatedDoc) {
        return res.status(400).end();
      }

      res.status(200).json({ data: updatedDoc });
    } catch (err) {
      throw httpErr(400, err);
    }
  });

export const removeOne = (model) =>
  asyncHandler(async (req, res, next, options) => {
    const [idReqType, id] = _handleIdReqTypeOpt(options);

    try {
      const removed = await model.findOneAndRemove({
        createdBy: req.user._id,
        _id: req[idReqType][id],
      });

      if (!removed) {
        return res.status(400).end();
      }

      return res.status(200).json({ data: removed });
    } catch (err) {
      throw httpErr(400, err);
    }
  });

export const genericControllers = (model) => ({
  getMany: getMany(model),
  createOne: createOne(model),
  getOne: getOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model),
});
