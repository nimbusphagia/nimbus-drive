import { getAllFiles, getFolderById, getRootFolder } from "../../db/queries.js";
import { buildTree } from "../lib/utilites.js";

export async function dashboardGet(req, res) {
  try {
    const userId = req.user.id;
    // Get folders structure
    const folders = await getAllFiles(userId);
    const tree = buildTree(folders);
    // Get current folder 
    const folderId = Number(req.params.folderId);
    if (folderId === 0) {
      const currentFolder = await getRootFolder(userId);
      return res.render('mainView', { folders: tree, currentFolder: currentFolder });
    }
    const currentFolder = await getFolderById(folderId, userId);
    return res.render('mainView', { folders: tree, currentFolder: currentFolder });
  } catch (err) {
    console.log(err);
    return res.render('404', { errMsg: err.message });
  }
}
