import { createFile, createFolder, createPublicUrl, deleteFolder, getAllFiles, getFolderById, getRootFolder, updateFolder } from "../../db/queries.js";
import { buildTree, getBaseUrl } from "../lib/utilites.js";


export async function dashboardGet(req, res) {
  try {
    const userId = req.user.id;
    // Get folders structure
    const folders = await getAllFiles(userId);
    const tree = buildTree(folders);
    // Get current folder 
    const folderId = Number(req.params.folderId);
    // Get public url
    const baseUrl = getBaseUrl(req);
    // Initialize folder
    let currentFolder;
    if (folderId == 0) {
      currentFolder = await getRootFolder(userId);
    } else {
      currentFolder = await getFolderById(folderId, userId);
    }
    if (!currentFolder) throw new Error("Folder doesn't exist");
    const publicUrl = `${baseUrl}/public/folder/${currentFolder.publicUrl.hash}`;
    return res.render('mainView', { folders: tree, currentFolder, publicUrl });

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
      const publicUrl = await createPublicUrl('FOLDER');
      await createFolder(userId, folderId, name, publicUrl.id);
      return res.redirect(`/drive/${folderId}`);
    }
    if (action === 'createFile') {
      const fileInput = req.file;
      const publicUrl = await createPublicUrl('FILE');
      const file = await createFile(folderId, userId, req.file.originalname, 'emptyurl', publicUrl.id);
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
