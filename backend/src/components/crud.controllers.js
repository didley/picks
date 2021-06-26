import chalk from "chalk";

// generic CRUD controllers, supply supply model as argument

const _handleIdReqTypeOpt = (optsObj = {}) => {
  const QUERY = "query";
  const BODY = "body";
  const PARAMS = "params";

  const { idReqType = QUERY } = optsObj;

  switch (idReqType) {
    case QUERY:
    case BODY:
    case PARAMS:
      return idReqType;

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

export const getOne = (model) => async (req, res, options) => {
  const idReqType = _handleIdReqTypeOpt(options);

  try {
    const doc = await model
      .findOne({ createdBy: req.user._id, _id: req[idReqType].id })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getMany = (model) => async (req, res) => {
  try {
    const docs = await model.find({ createdBy: req.user._id }).lean().exec();

    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const createOne = (model) => async (req, res) => {
  const createdBy = req.user._id;
  try {
    const doc = await model.create({ ...req.body, createdBy });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateOne = (model) => async (req, res, options) => {
  const idReqType = _handleIdReqTypeOpt(options);

  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          createdBy: req.user._id,
          _id: req[idReqType]._id,
        },
        req.body,
        { new: true }
      )
      .lean();

    if (!updatedDoc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedDoc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const removeOne = (model) => async (req, res, options) => {
  const idReqType = _handleIdReqTypeOpt(options);

  try {
    const removed = await model.findOneAndRemove({
      createdBy: req.user._id,
      _id: req[idReqType].id,
    });

    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const genericControllers = (model) => ({
  getOne: getOne(model),
  getMany: getMany(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model),
});
