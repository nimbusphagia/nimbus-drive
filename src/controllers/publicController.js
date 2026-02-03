import { getFileByPublic, getFolderByPublic } from "../../db/queries.js";
import { getBaseUrl } from "../lib/utilites.js";

export async function publicFileGet(req, res) {
  const { hashId } = req.params;
  console.log(hashId)
  try {
    const file = await getFileByPublic(hashId);
    return res.render('publicFile', { file: file });
  } catch (err) {
    console.error(err);
    return res.redirect('/login');
  }
}
export async function publicFolderGet(req, res) {
  const { hashId } = req.params;
  console.log(hashId);
  try {
    const folder = await getFolderByPublic(hashId);
    const baseUrl = getBaseUrl(req);
    return res.render('publicFolder', { folder: folder, folders: folder.folders, files: folder.files, baseUrl });
  } catch (err) {
    console.error(err);
    return res.redirect('/login');
  }
}  
