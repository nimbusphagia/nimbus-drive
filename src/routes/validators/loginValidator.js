import { body } from "express-validator";
export const loginValidator = [
  body('username')
    .trim()
    .notEmpty().withMessage("Username is required").bail()
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters')
    .matches(/^\S+$/).withMessage("Username cannot contain spaces")
    .toLowerCase(),
  body('password')
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter"),
];
