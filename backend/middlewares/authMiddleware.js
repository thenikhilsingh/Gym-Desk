const jwt = require("jsonwebtoken");
const { getUserbyEmailButWithoutPassword } = require("../db/queries");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided!" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = await getUserbyEmailButWithoutPassword(isVerified.email);

    req.user = userData;
    req.token = token;
    req.userId = userData.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized. Invalid Token!" });
  }
};

module.exports = authMiddleware;
