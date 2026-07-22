const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createPlan, getPlans } = require("../controllers/plansController");

const plansRouter = Router();

plansRouter.post("/create", authMiddleware, createPlan);
plansRouter.get("/", authMiddleware, getPlans);

module.exports = plansRouter;
