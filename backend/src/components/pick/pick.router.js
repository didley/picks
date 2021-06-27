import { Router } from "express";
import controllers from "./pick.controller";

const router = Router();

//api/pick/
router.route("/").post(controllers.addPick);
// router.delete("/", controllers.deletePick);
// router.put("/", controllers.updatePick);

export default router;
