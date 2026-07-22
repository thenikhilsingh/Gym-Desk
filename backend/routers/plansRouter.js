const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createPlan,
  getPlans,
  getStatsCardCount,
} = require("../controllers/plansController");

const plansRouter = Router();

plansRouter.post("/create", authMiddleware, createPlan);
plansRouter.get("/", authMiddleware, getPlans);
plansRouter.get("/statsCount", authMiddleware, getStatsCardCount);

module.exports = plansRouter;
