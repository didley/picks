import { Router } from "express";

import controllers from "./user.controllers";

const router = Router();

// /api/user
router
  .route("/")
  .get(controllers.createOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

router.post("/login");
router.post("/logout");
router.post("/register", controllers.createUser);

export default router;
