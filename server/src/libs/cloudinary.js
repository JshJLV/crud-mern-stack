const cloudinary = require("cloudinary");

cloudinary.v2.config({
  cloud_name: "dbsvqnoqz",
  api_key: "161649495745814",
  api_secret: "D38CeR9q4E56GxDP1zpSWy1_0hA",
});

const uploadImage = async (filePath) => {
  return await cloudinary.v2.uploader.upload(filePath, {
    folder: "post",
  });
};

const deleteImage = async (id) => {
  return await cloudinary.v2.uploader.destroy(id);
};

module.exports = { uploadImage, deleteImage };
