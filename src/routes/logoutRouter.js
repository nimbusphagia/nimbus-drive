import { Router } from "express";
import { logoutGet } from "../controllers/logoutController.js";

const logoutRouter = new Router();

logoutRouter.get('/logout', logoutGet);

export default logoutRouter;
