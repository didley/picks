import { Router } from "express";

import controllers from "./user.controllers";

const router = Router();

//api/user
router.route("/").get(controllers.getUser).put(controllers.updateUser);
// .delete(controllers.removeOne);

router.post("/login", controllers.loginUser);
router.post("/logout");
router.post("/register", controllers.createUser);

export default router;
