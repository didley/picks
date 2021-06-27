import { Router } from "express";
import controllers from "./card.controller";
import { useQSRouteMatcher } from "../../utils/useQSRouteMatcher";

const router = Router();

const matchOnIdQS = useQSRouteMatcher("id");

//api/cards
router.get("/", matchOnIdQS, controllers.getCardById);
router.get("/", controllers.getAllCards);
router.delete("/", controllers.deleteCardById);
router.post("/", controllers.createCard);
router.put("/", controllers.updateCard);

// router.route("/weekly").get(controllers.getAllWeeklyCards);
// router.route("/topic").get(controllers.getAllTopicCards);

export default router;
