import { Router } from "express";
import controller from "./helloWorld.controller";

const router = Router();

router.route("/").get(controller.getHelloWorld);

export default router;
