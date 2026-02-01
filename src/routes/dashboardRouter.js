import { Router } from "express";
import { dashboardGet, dashboardPost } from "../controllers/dashboardController.js";

const dashboardRouter = new Router();
dashboardRouter.get('/', (req, res) => res.redirect('/drive/0'));

dashboardRouter.get('/drive/:folderId', dashboardGet);
dashboardRouter.post('/drive/:folderId/:action', dashboardPost);

export default dashboardRouter;
