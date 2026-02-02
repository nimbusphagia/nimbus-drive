import { getFileById } from "../../db/queries.js";

export async function previewGet(req, res) {
  const userId = req.user.id;
  const fileId = Number(req.params.fileId);
  try {
    const file = await getFileById(fileId, userId);
    return res.render('filePreview', { file: file });
  } catch (error) {
    console.error(error);
    return res.render('404', { errMsg: error });
  }
}
