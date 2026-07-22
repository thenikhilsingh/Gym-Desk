const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createPlan,
  getPlans,
  getStatsCardCount,
  updatePlan,
  getPlan,
  editActiveStatus,
} = require("../controllers/plansController");

const plansRouter = Router();

plansRouter.post("/create", authMiddleware, createPlan);
plansRouter.get("/", authMiddleware, getPlans);
plansRouter.get("/statsCount", authMiddleware, getStatsCardCount);
plansRouter.patch("/edit/:planId", authMiddleware, updatePlan);
plansRouter.get("/:planId", authMiddleware, getPlan);
plansRouter.patch(
  "/:planId/updateActiveStatus",
  authMiddleware,
  editActiveStatus,
);

module.exports = plansRouter;
