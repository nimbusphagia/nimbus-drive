import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_uploads",
    resource_type: "auto", // images, videos, pdfs, zips, etc
  },
});

const upload = multer({ storage });

export default upload;
