import cloudinary from "../../config/cloudinary.js";
import { deleteFile, getFileById } from "../../db/queries.js";
import { getBaseUrl } from "../lib/utilites.js";

export async function previewGet(req, res) {

  try {
    const userId = req.user.id;
    const fileId = Number(req.params.fileId);

    const file = await getFileById(fileId, userId);
    if (!file) throw new Error("File not found");

    const baseUrl = getBaseUrl(req);
    const publicUrl = `${baseUrl}/public/file/${file.publicUrl.hash}`;

    return res.render('filePreview', {
      file: file,
      publicUrl: publicUrl,
    });
  } catch (error) {
    console.error(error);
    return res.render('404', { errMsg: error });
  }
}
export async function previewPost(req, res) {
  const { action } = req.params;
  const userId = Number(req.user.id);
  if (action === 'deleteFile') {
    const fileId = Number(req.params.fileId);
    const file = await getFileById(fileId, userId);
    const folderId = file.folderId;
    await cloudinary.uploader.destroy(file.cloudId, {
      resource_type: "raw", // important for non-images
    });
    await deleteFile(fileId, userId);

    return res.redirect(`/drive/${folderId}`);

  }
}
