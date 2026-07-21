const { Router } = require("express");
const { register, login, user } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");

const authRouter = Router();

authRouter.post("/register", registerValidator, register);
authRouter.post("/login", loginValidator, login);
authRouter.get("/user", authMiddleware, user);

module.exports = { authRouter };
