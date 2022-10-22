const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateCampground } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({
  storage,
});
const {
  editCampground,
  createCamground,
  showCampground,
  index,
  deleteCampground,
} = require("../controllers/campground");

// POST ROUTE || CREATE ROUTE
router.post(
  "/",
  isLoggedIn,
  // validateCampground,
  upload.array("images"),
  catchAsync(createCamground)
);

// INDEX || READ ROUTE
router.get("/", catchAsync(index));

// SHOW || READ ROUTE
router.get("/:id", catchAsync(showCampground));

// EDIT ROUTE || UPDATE ROUTE
router.put(
  "/:id",
  isLoggedIn,
  // validateCampground,
  upload.array("images"),
  catchAsync(editCampground)
);

// DELETE ROUTE
router.delete("/:id", isLoggedIn, catchAsync(deleteCampground));

module.exports = router;
