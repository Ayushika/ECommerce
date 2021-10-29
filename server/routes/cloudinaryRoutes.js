/** @format */

const express = require("express");
const router = express.Router();
const { protect, checkAdmin } = require("../middlewares/authMiddleware");
const {
  uploadImage,
  removeImage,
} = require("../controllers/cloudinaryController");

router.route("/uploadimages").post(protect, checkAdmin, uploadImage);
router.route("/removeimage").post(protect, checkAdmin, removeImage);

module.exports = router;
