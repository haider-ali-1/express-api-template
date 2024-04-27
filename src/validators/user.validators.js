import { body } from "express-validator";
import { validator } from "../middlewares/validator.middleware.js";

const registerUserValidator = validator([
  body("name").notEmpty().withMessage("name is required"),

  body("username").notEmpty().withMessage("username is required"),

  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be valid"),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({
      min: 8,
    })
    .withMessage("password must be at least 8 characters long"),

  body("avatar").notEmpty().withMessage("avatar is required"),
]);

export { registerUserValidator };
