const Campground = require("../models/campground");
const Review = require("../models/review");
const AppError = require("../utils/appError");

exports.indexReviews = async (req, res) => {
  const { id: campgroundId } = req.params;
  req.body.author = req.session.user_id; // Adding the user Id to review of the user id who made the review
  let review = new Review(req.body);
  const campground = await Campground.findById(campgroundId);
  campground.reviews.push(review);
  const addedReview = await (await review.save()).populate("author");
  await campground.save();
  res.status(200).send(addedReview);
};

exports.deleteReviews = async (req, res) => {
  const { id: campId, reviewId } = req.params;

  const deleted = await Review.findOneAndDelete({
    _id: reviewId,
    author: { _id: req.session.user_id },
  });

  if (deleted) {
    await Campground.findByIdAndUpdate(campId, {
      $pull: { reviews: reviewId },
    });
    res.send("success");
  } else throw new AppError("You can only delete your reviews", 401);
};
