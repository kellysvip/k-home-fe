import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../app/config";
import axios from "axios";

export const cloudinaryUploadAvatar = async (images) => {
  console.log(CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET, images);
  if (!images) return "";
  try {
    const formData = new FormData();
    formData.append("upload_preset", "kellysvip");
    formData.append("file", images);

    formData.append("cloud_name", "kellysvip");
    console.log("formData", formData);
    const response = await axios({
      url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("responseformData", response.data.secure_url);

    const imageUrl = response.data.secure_url;

    return imageUrl;
  } catch (error) {
    throw error;
  }
};
