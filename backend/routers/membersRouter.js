const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllMembers,
  addMember,
} = require("../controllers/membersController");
const upload = require("../middlewares/multerMiddleware");

const membersRouter = Router();

membersRouter.get("/", authMiddleware, getAllMembers);
membersRouter.post(
  "/add",
  authMiddleware,
  upload.single("profileImage"),
  addMember,
);

module.exports = membersRouter;
