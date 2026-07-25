const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllTrainers } = require("../controllers/trainersController");

const trainersRouter = Router();

trainersRouter.get("/", authMiddleware, getAllTrainers);

module.exports = trainersRouter;
