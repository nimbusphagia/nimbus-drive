import { Router } from "express";
import { previewGet } from "../controllers/previewController.js";

const previewRouter = new Router();
previewRouter.get('/preview/:fileId', previewGet);

export default previewRouter;
