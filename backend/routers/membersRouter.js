const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllMembers,
  addMember,
} = require("../controllers/membersController");

const membersRouter = Router();

membersRouter.get("/", authMiddleware, getAllMembers);
membersRouter.post("/add", authMiddleware, addMember);

module.exports = membersRouter;
