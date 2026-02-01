import { getAllFiles } from "../../db/queries.js";
import { buildTree } from "../lib/utilites.js";

export async function dashboardGet(req, res) {
  try {
    const userId = req.user.id;
    const folders = await getAllFiles(userId);
    const tree = buildTree(folders);
    res.render('mainView', { folders: tree });
  } catch (err) {
    console.log(err);
    res.render('404', { errMsg: err.message });
  }
}
