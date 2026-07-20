const { getUserbyEmail, createUser } = require("../db/queries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
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
      msg: "Registeration Successfull!",
      token: generatedToken,
      userId: userCreated.id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await getUserbyEmail(email);
    if (!userExist) {
      return res.status(400).send({ msg: "Invalid Credentials!" });
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
      msg: "Login Successfull!",
      token: generatedToken,
      userId: userExist.id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { register, login };
