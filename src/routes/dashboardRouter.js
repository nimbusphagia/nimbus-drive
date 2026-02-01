import { Router } from "express";
import { dashboardGet } from "../controllers/dashboardController.js";

const dashboardRouter = new Router();
dashboardRouter.get('/', (req, res) => res.redirect('/drive'));

dashboardRouter.get('/drive', dashboardGet);

export default dashboardRouter;
