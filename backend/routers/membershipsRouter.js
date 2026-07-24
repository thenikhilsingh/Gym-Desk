const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getMemberships,
  insertMembership,
  editMembership,
  getTheMembership,
} = require("../controllers/membershipsController");

const membershipsRouter = Router();

membershipsRouter.get("/", authMiddleware, getMemberships);
membershipsRouter.get("/:membershipId", authMiddleware, getTheMembership);
membershipsRouter.post("/add", authMiddleware, insertMembership);
membershipsRouter.patch("/edit/:membershipId", authMiddleware, editMembership);

module.exports = membershipsRouter;
