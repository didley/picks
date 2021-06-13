import { Router } from "express";

const router = Router();

import helloWorld from "./helloWorld/helloWorld.router";

router.use("/hello", helloWorld);

export { router };
