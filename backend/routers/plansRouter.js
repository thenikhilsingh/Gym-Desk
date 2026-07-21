const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createPlan } = require("../controllers/plansController");

const plansRouter = Router();

plansRouter.post("/create", authMiddleware, createPlan);

module.exports = plansRouter;
