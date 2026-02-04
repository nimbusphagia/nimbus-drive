import { Router } from "express";
import { dashboardGet, dashboardPost, dashboardUpload } from "../controllers/dashboardController.js";
import upload from "../lib/upload.js";

const dashboardRouter = new Router();
dashboardRouter.get('/', (req, res) => res.redirect('/drive/0'));
dashboardRouter.get('/drive', (req, res) => res.redirect('/drive/0'));

dashboardRouter.get('/drive/:folderId', dashboardGet);
dashboardRouter.post('/drive/:folderId/upload', upload.single('file'), dashboardUpload);
dashboardRouter.post('/drive/:folderId/:action', dashboardPost);

export default dashboardRouter;
