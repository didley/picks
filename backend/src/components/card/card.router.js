import { Router } from "express";
import controllers from "./card.controller";
import { useQSRouteMatcher } from "../../utils/useQSRouteMatcher";
import { protectRoute } from "../../utils/auth";

const router = Router();

const matchOnIdQS = useQSRouteMatcher("id");

//api/cards
router.get("/", protectRoute, matchOnIdQS, controllers.getCardById);
router.get("/", protectRoute, controllers.getAllCards);
router.delete("/", protectRoute, controllers.deleteCardById);
router.post("/", protectRoute, controllers.createCard);
router.put("/", protectRoute, controllers.updateCard);

// router.route("/weekly").get(controllers.getAllWeeklyCards);
// router.route("/topic").get(controllers.getAllTopicCards);

export default router;
