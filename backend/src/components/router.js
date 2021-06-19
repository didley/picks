import { Router } from "express";
import userRoutes from "./user/user.router";
import helloWorld from "./helloWorld/helloWorld.router";

const router = Router();

router.use("/user", userRoutes);
router.use("/hello", helloWorld);

export { router };
