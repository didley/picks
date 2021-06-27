import { Router } from "express";
import controllers from "./pick.controller";

const router = Router();

//api/pick/
router.post("/", controllers.addPick);

// fromCard in req.body
router.put("/", controllers.updatePick);

// queryString cardId & pickId
router.delete("/", controllers.deletePick);

export default router;
