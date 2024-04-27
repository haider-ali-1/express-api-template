import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

const validator = (validations) => {
  return [
    validations,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, "validation error", errors.array());
      }
      next();
    },
  ];
};

export { validator };
