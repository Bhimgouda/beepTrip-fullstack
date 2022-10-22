const AppError = require("./utils/appError");
const { reviewSchema, campgroundSchema } = require("./serverSideSchemas");

// Defining middleware functions that are going to run on applied routes

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.user_id)
    throw new AppError("User needs to be logged In", 401);
  next();
};

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const message = error.details.map((e) => e.message).join(",");
    throw new AppError(message, 401);
  } else {
    next();
  }
};
