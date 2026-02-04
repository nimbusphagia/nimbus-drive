import { Router } from "express";
import { previewGet, previewPost } from "../controllers/previewController.js";

const previewRouter = new Router();
previewRouter.get('/preview/:fileId', previewGet);
previewRouter.post('/preview/:fileId/:action', previewPost);

export default previewRouter;
