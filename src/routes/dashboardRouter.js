import { Router } from "express";
import { dashboardGet, dashboardPost } from "../controllers/dashboardController.js";

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const dashboardRouter = new Router();
dashboardRouter.get('/', (req, res) => res.redirect('/drive/0'));
dashboardRouter.get('/drive', (req, res) => res.redirect('/drive/0'));

dashboardRouter.get('/drive/:folderId', dashboardGet);
dashboardRouter.post('/drive/:folderId/:action', upload.single('file'), dashboardPost);

export default dashboardRouter;
