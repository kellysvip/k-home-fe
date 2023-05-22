import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../app/config";
import axios from "axios";

export const cloudinaryUpload = async (images) => {
  console.log(CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET, images);
  if (!images) return "";
  // const imageUrl = [];
  try {
    // for (const image of images) {
    //   const formData = new FormData();
    //   formData.append("upload_preset", "kellysvip");
    //   formData.append("cloud_name", "kellysvip");

    //   formData.append("file", image);
    //   console.log("formData", formData);
    //   const response = await axios({
    //     url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    //     method: "POST",
    //     data: formData,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });

    //   imageUrl.push(response.data.secure_url);
    // }
    const imageUrl = await Promise.all(
      images.map((image) => {
        const formData = new FormData();
        formData.append("upload_preset", "kellysvip");
        formData.append("cloud_name", "kellysvip");

        formData.append("file", image);
        console.log("formData", formData);
        return axios({
          url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          method: "POST",
          data: formData,
          headers: { "Content-Type": "multipart/form-d" },
        }).then(({ data: { secure_url: secureUrl } }) => secureUrl)

      })
    );

    console.log("imageUrl", imageUrl);
    return imageUrl;
  } catch (error) {
    throw error;
  }
};
