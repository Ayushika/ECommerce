/** @format */

const cloudinary = require("cloudinary").v2;
const asyncHandler = require("express-async-handler");

cloudinary.config({
  cloud_name: "deeh6yr8z",
  api_key: "285899124631369",
  api_secret: "sPuLhOfIti8gKkoh2ioKiMxGlmU",
});

const uploadImage = asyncHandler(async (req, res) => {
  const { image } = req.body;
  const result = await cloudinary.uploader.upload(image, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
  });

  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
});

const removeImage = asyncHandler(async (req, res) => {
  const { public_id } = req.body;
  const result = cloudinary.uploader.destroy(public_id);

  if (result) {
    res.send("Deleted Successfully");
  } else {
    res.status(404);
    throw new Error(`Error, while deleting image`);
  }
});

module.exports = { uploadImage, removeImage };
