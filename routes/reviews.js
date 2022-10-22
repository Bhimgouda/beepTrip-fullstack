const express = require("express");
const router = express.Router({ mergeParams: true }); // merge params will make the prefix param available from the app.js folder
const Review = require("../models/review");
const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware");
const { validateReview } = require("../middleware");
const { indexReviews, deleteReviews } = require("../controllers/review");

// CREATE ROUTE
router.post("/", isLoggedIn, validateReview, catchAsync(indexReviews));

// DELETE ROUTE
router.delete("/:reviewId", isLoggedIn, catchAsync(deleteReviews));

module.exports = router;
