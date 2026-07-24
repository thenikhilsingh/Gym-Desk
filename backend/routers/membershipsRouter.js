const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getMemberships } = require("../controllers/membershipsController");

const membershipsRouter = Router();

membershipsRouter.get("/", authMiddleware, getMemberships);

module.exports = membershipsRouter;
