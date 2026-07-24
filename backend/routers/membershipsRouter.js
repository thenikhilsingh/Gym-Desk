const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getMemberships,
  insertMembership,
  editMembership,
  getTheMembership,
  cancelMembership,
} = require("../controllers/membershipsController");

const membershipsRouter = Router();

membershipsRouter.get("/", authMiddleware, getMemberships);
membershipsRouter.get("/:membershipId", authMiddleware, getTheMembership);
membershipsRouter.post("/add", authMiddleware, insertMembership);
membershipsRouter.patch("/edit/:membershipId", authMiddleware, editMembership);
membershipsRouter.patch(
  "/cancel/:membershipId",
  authMiddleware,
  cancelMembership,
);

module.exports = membershipsRouter;
