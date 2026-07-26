const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerMiddleware");
const {
  getAllTrainers,
  addTrainer,
  editTrainer,
  getTrainerDetails,
  toggleTrainerStatus,
  getTrainersStats,
} = require("../controllers/trainersController");

const trainersRouter = Router();

trainersRouter.get("/", authMiddleware, getAllTrainers);
trainersRouter.get("/stats", authMiddleware, getTrainersStats);
trainersRouter.get("/:trainerId", authMiddleware, getTrainerDetails);
trainersRouter.post("/add", authMiddleware, upload.single("photo"), addTrainer);
trainersRouter.patch(
  "/edit/:trainerId",
  authMiddleware,
  upload.single("photo"),
  editTrainer,
);
trainersRouter.patch(
  "/toggleTrainerStatus/:trainerId",
  authMiddleware,
  toggleTrainerStatus,
);

module.exports = trainersRouter;
