import { Router } from "express";
import { dashboardGet } from "../controllers/dashboardController.js";

const dashboardRouter = new Router();
dashboardRouter.get('/', (req, res) => res.redirect('/drive/0'));

dashboardRouter.get('/drive/:folderId', dashboardGet);

export default dashboardRouter;
