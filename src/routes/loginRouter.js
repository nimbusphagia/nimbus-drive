import { Router } from "express";
import { loginGet } from "../controllers/loginController.js";
import { loginValidator } from "./validators/loginValidator.js";
import { validate } from "./validators/validate.js";
import passport from "passport";

const loginRouter = new Router();

loginRouter.get('/login', loginGet);
loginRouter.post('/login', loginValidator, validate('login'), passport.authenticate("local", {
  failureRedirect: "/login?warning=invalid-credentials",
  successRedirect: "/",
}));

export default loginRouter;
