const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getMemberships,
  insertMembership,
} = require("../controllers/membershipsController");

const membershipsRouter = Router();

membershipsRouter.get("/", authMiddleware, getMemberships);
membershipsRouter.post("/add", authMiddleware, insertMembership);

module.exports = membershipsRouter;
