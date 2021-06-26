import { Router } from "express";
import controllers from "./card.controller";

const router = Router();

const matchIdQueryString = (req, res, next) => {
  return next(req.query.id ? null : "route");
};

//api/cards
router.get("/", matchIdQueryString, controllers.getCardById);
router.get("/", controllers.getAllCards);
router.delete("/", controllers.deleteCardById);
router.post("/", controllers.createCard);
router.put("/", controllers.updateCard);

// router.route("/weekly").get(controllers.getAllWeeklyCards);
// router.route("/topic").get(controllers.getAllTopicCards);

export default router;
