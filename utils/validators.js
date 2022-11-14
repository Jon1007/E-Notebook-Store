const { body } = require("express-validator");
const User = require("../models/user");
const mongoose = require("mongoose");


exports.registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Enter your email correctly")
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("This email is already exist");
        }
      } catch (e) {
        console.log(e);
      }
    })
    .normalizeEmail(),
  body("password", "Password should contain at least 6 symbols")
    .isLength({
      min: 6,
      max: 26,
    })
    .isAlphanumeric()
    .trim(),
  body("confirm")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password should be same");
      }
      return true;
    })
    .trim(),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name should contain at least 3 symbols")
    .trim(),
];

exports.notebookValidators = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("Minimum length for title should be 3 symbols")
    .trim(),
  body("price").isNumeric().withMessage("Write correct price"),
  body("img").isURL().withMessage("Write correct Image URL"),
  body("descr")
    .isLength({ min: 10 })
    .withMessage("Description should be min 10 symbols"),
];
