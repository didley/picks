import { Router } from "express";
import controllers from "./pick.controller";

const router = Router();

//api/pick/
router.route("/:cardId").post(controllers.addPick);

router
  .route("/:cardId/:pickIndex")
  .delete(controllers.deletePick)
  .put(controllers.updatePick);

export default router;
