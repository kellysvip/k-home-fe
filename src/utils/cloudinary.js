import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../app/config";
import axios from "axios";

export const cloudinaryUpload = async (images) => {
  console.log(CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET, images);
  if (!images) return "";
  const imageUrl = [];
  try {
    for (const image of images) {
      const formData = new FormData();
      formData.append("upload_preset", "kellysvip");
      formData.append("cloud_name", "kellysvip");

      formData.append("file", image);
      console.log("formData", formData);
      const response = await axios({
        url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      // console.log("responseformData", response.data.secure_url);
      imageUrl.push(response.data.secure_url);
    }

    //await Promise.all( )

    console.log("imageUrl", imageUrl);
    // const imageUrl = response.data.secure_url;
    //AIzaSyB7k9PV0bxEXkF2WdtcOxA2AQJ139IeGY4
    return imageUrl;
  } catch (error) {
    throw error;
  }
};
