const { getUserbyEmail, createUser } = require("../db/queries");
const bcrypt = require("bcryptjs");
const { validationResult } = require("../validators/authValidator");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExist = await getUserbyEmail(email);
    if (userExist) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const saltRound = await bcrypt.genSalt();
    const hashed_password = await bcrypt.hash(password, saltRound);
    const userCreated = await createUser(
      firstName,
      lastName,
      email,
      hashed_password,
    );
    const generatedToken = jwt.sign(
      {
        userId: userCreated.id,
        email: userCreated.email,
        isAdmin: userCreated.is_admin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      },
    );
    return res.status(201).json({
      message: "Registeration Successfull!",
      token: generatedToken,
      userId: userCreated.id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    const userExist = await getUserbyEmail(email);
    if (!userExist) {
      return res.status(400).send({ message: "Invalid Credentials!" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!",
      });
    }
    const generatedToken = jwt.sign(
      {
        userId: userExist.id,
        email: userExist.email,
        isAdmin: userExist.is_admin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      },
    );

    return res.status(200).json({
      message: "Login Successfull!",
      token: generatedToken,
      userId: userExist.id.toString(),
      isAdmin: userExist.is_admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const user = async (req, res) => {
  try {
    const loggedInUser = req.user;
    return res.status(200).json({ loggedInUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { register, login, user };
