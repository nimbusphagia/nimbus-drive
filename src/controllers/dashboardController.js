import { createFile, createFolder, createPublicUrl, deleteFile, deleteFolder, getAllFiles, getFileById, getFolderById, getRootFolder, updateFolder } from "../../db/queries.js";
import { buildTree, getBaseUrl } from "../lib/utilites.js";
import mime from 'mime-types';

function truncateSentence(sentence, maxLength = 15, chunkSize = 10) {
  const extensionMatch = sentence.match(/(\.[a-z0-9]+)$/i);

  let baseName = sentence;
  let extension = '';
  let wasTruncated = false;

  if (extensionMatch) {
    extension = extensionMatch[0];
    baseName = sentence.slice(0, -extension.length);
  }

  if (baseName.length > maxLength) {
    baseName = baseName.slice(0, maxLength);
    wasTruncated = true;
  }

  // Only insert wrap points if it's still long enough to matter
  if (baseName.length > chunkSize) {
    const ZWSP = String.fromCharCode(8203);
    baseName = baseName.replace(
      new RegExp(`(.{${chunkSize}})`, 'g'),
      `$1${ZWSP}`
    );
  }

  if (wasTruncated) {
    baseName += '..';
  }

  return baseName;
}





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
    const publicPath = `${baseUrl}/public/folder/${currentFolder.publicUrl.hash}`;
    return res.render('mainView', { folders: tree, currentFolder, publicUrl: publicPath, trimTitle: truncateSentence });

  } catch (err) {
    console.error(err);
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
    if (action === 'editFolder') {
      const newName = req.body.name;
      await updateFolder(folderId, userId, newName);
      return res.redirect(`/drive/${folderId}`);
    }
    if (action === 'deleteFolder') {
      await deleteFolder(folderId, userId);
      // ADD delete all cloudinary urls
      return res.redirect(`/drive/0`);
    }
    return res.redirect('/drive/0')
  } catch (error) {
    console.error(error);
    return res.render('404', { errMsg: error.message });
  }
}
export async function dashboardUpload(req, res) {
  const userId = req.user.id;
  const folderId = Number(req.params.folderId);
  try {
    // Cloudinary
    const fileInput = req.file;
    if (!fileInput) throw new Error('No file uploaded');
    const fileUrl = req.file.path;
    const cloudId = req.file.filename;
    const extension = mime.extension(req.file.mimetype);
    // Public Route
    const publicUrl = await createPublicUrl('FILE');

    await createFile(folderId, userId, req.file.originalname, extension, fileUrl, cloudId, publicUrl.id);
    return res.redirect(`/drive/${folderId}`);
  } catch (error) {
    console.error(error);
    return res.render('404', { errMsg: error.message });

  }
}
