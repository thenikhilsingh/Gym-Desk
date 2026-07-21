const { Router } = require("express");
const { register, login, user } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/user", authMiddleware, user);

module.exports = { authRouter };
