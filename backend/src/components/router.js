import { Router } from "express";
import userRoutes from "./user/user.router";
import cardRoutes from "./card/card.router";
import pickRoutes from "./pick/pick.router";
import { protectRoute } from "../utils/auth";

const router = Router();

router.use("/user", userRoutes);
router.use("/cards", cardRoutes);
// router.use("/pick", protectRoute, pickRoutes);

export { router };
