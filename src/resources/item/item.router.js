import { Router } from "express";
import controllers from "./item.controllers";

const router = Router();

// /api/list
router
  .route("/")
  .get(controllers.getMany)
  .post(controllers.createOne)
  .put(controllers.updateOne);

// /api/list/:id
router
  .route("/:id")
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
