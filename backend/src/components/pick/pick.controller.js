import { genericControllers } from "../crud.controllers";
import { Pick } from "./pick.model";

const addPick = (...args) => {
  genericControllers.createOne(Pick);
};

const deletePick = (...args) => {
  genericControllers.removeOne(Pick);
};

const updatePick = (...args) => {
  genericControllers.updateOne(Pick);
};

export default { addPick, deletePick, updatePick };
