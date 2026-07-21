const { body, validationResult } = require("express-validator");

const registerValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required!")
    .isLength({ min: 3, max: 50 })
    .withMessage("First name must be between 3 and 50 characters"),

  body("lastName")
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = {
  validationResult,
  registerValidator,
  loginValidator,
};
