import { Router } from "express";
import userRoutes from "./user/user.router";
import helloWorld from "./helloWorld/helloWorld.router";
import { protectRoute } from "../utils/auth";

const router = Router();

router.use("/user", userRoutes);
router.use("/hello", protectRoute, helloWorld);

export { router };
