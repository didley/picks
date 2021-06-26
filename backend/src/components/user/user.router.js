import { Router } from "express";
import { protectRoute } from "../../utils/auth";

import controllers from "./user.controllers";

const router = Router();

//api/user
router
  .route("/")
  .get(protectRoute, controllers.getUser)
  .put(protectRoute, controllers.updateUser);
// .delete(controllers.removeOne);

router.post("/login", controllers.loginUser);
router.post("/logout");
router.post("/register", controllers.createUser);

export default router;
