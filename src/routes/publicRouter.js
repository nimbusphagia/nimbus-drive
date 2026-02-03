import { Router } from "express";
import { publicFileGet, publicFolderGet } from "../controllers/publicController.js";

const publicRouter = new Router();

publicRouter.get('/public/file/:hashId', publicFileGet);
publicRouter.get('/public/folder/:hashId', publicFolderGet);

export default publicRouter;
