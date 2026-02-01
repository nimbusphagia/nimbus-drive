import { Router } from "express";
import { signUpGet, signUpPost } from "../controllers/signUpController.js";
import { signUpValidator } from "./validators/signUpValidator.js";
import { validate } from "./validators/validate.js";

const signUpRouter = new Router();

signUpRouter.get('/signup', signUpGet);
signUpRouter.post('/signup', signUpValidator, validate('signUp'), signUpPost);

export default signUpRouter;
