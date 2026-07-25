const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerMiddleware");
const {
  getAllTrainers,
  addTrainer,
} = require("../controllers/trainersController");

const trainersRouter = Router();

trainersRouter.get("/", authMiddleware, getAllTrainers);
trainersRouter.post("/add", authMiddleware, upload.single("photo"), addTrainer);

module.exports = trainersRouter;
