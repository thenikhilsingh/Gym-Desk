const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllMembers } = require("../controllers/membersController");

const membersRouter = Router();

membersRouter.get("/", authMiddleware, getAllMembers);

module.exports = membersRouter;
