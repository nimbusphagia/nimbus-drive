import { validationResult } from "express-validator";

export const validate = (viewName) => {
  return (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render(viewName, {
        errors: errors.array(),
        values: req.body
      });
    }

    next();
  };
};

