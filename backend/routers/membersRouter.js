const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllMembers,
  addMember,
  editMember,
  getMemberDetails,
  deleteMember,
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
membersRouter.patch(
  "/edit/:memberId",
  authMiddleware,
  upload.single("profileImage"),
  editMember,
);
membersRouter.get("/:memberId", authMiddleware, getMemberDetails);
membersRouter.delete("/delete/:memberId", authMiddleware, deleteMember);

module.exports = membersRouter;
