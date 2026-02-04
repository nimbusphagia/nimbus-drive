import { getFileByPublic, getFolderByPublic } from "../../db/queries.js";
import { getBaseUrl } from "../lib/utilites.js";
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
  try {
    const folder = await getFolderByPublic(hashId);
    const baseUrl = getBaseUrl(req);
    return res.render('publicFolder', {
      folder: folder,
      folders: folder.folders,
      files: folder.files,
      baseUrl: baseUrl,
      trimTitle: truncateSentence,
    });
  } catch (err) {
    console.error(err);
    return res.redirect('/login');
  }
}  
