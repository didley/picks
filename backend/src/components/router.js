import { Router } from "express";
import userRoutes from "./user/user.router";
import cardRoutes from "./card/card.router";

const router = Router();

router.use("/user", userRoutes);
router.use("/cards", cardRoutes);

export { router };
