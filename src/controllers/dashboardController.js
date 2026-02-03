import { createFile, createFolder, deleteFolder, getAllFiles, getFolderById, getRootFolder, updateFolder } from "../../db/queries.js";
import { buildTree } from "../lib/utilites.js";


export async function dashboardGet(req, res) {
  try {
    const userId = req.user.id;
    // Get folders structure
    const folders = await getAllFiles(userId);
    const tree = buildTree(folders);
    // Get current folder 
    const folderId = Number(req.params.folderId);
    if (folderId == 0) {
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

export async function dashboardPost(req, res) {
  const { action } = req.params;
  const userId = req.user.id;
  const folderId = Number(req.params.folderId);
  const { name } = req.body;

  try {
    if (action === 'createFolder') {
      await createFolder(userId, folderId, name)
      return res.redirect(`/drive/${folderId}`);
    }
    if (action === 'createFile') {
      const fileInput = req.file;
      const file = await createFile(folderId, userId, req.file.originalname);
      console.log(fileInput, file);
      return res.redirect(`/drive/${folderId}`);
    }
    if (action === 'editFolder') {
      const newName = req.body.name;
      await updateFolder(folderId, userId, newName);
      return res.redirect(`/drive/${folderId}`);
    }
    if (action === 'deleteFolder') {
      await deleteFolder(folderId, userId);
      return res.redirect(`/drive/0`);
    }
    return res.redirect('/drive/0')
  } catch (error) {
    console.error(error);
    return res.render('404', { errMsg: error.message });
  }
}
