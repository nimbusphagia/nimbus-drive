import { getFileById } from "../../db/queries.js";
import { getBaseUrl } from "../lib/utilites.js";

export async function previewGet(req, res) {
  const userId = req.user.id;
  const fileId = Number(req.params.fileId);
  try {
    const file = await getFileById(fileId, userId);
    const baseUrl = getBaseUrl(req);
    const publicUrl = `${baseUrl}/public/file/${file.publicUrl.hash}`;
    console.log(publicUrl);
    return res.render('filePreview', { file: file, publicUrl: publicUrl });
  } catch (error) {
    console.error(error);
    return res.render('404', { errMsg: error });
  }
}
