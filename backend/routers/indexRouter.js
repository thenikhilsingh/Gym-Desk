const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/health", indexController);

module.exports = { indexRouter };
