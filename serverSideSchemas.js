// This module is for express/server-side validation before anything is inserted into DB

const Joi = require("joi");

exports.campgroundSchema = Joi.object({
  title: Joi.string().required(),
  location: Joi.string().required(),
  // image: Joi.string().required(),
  price: Joi.number().required().min(0),
  description: Joi.string().required(),
  deleteImages: Joi.array(),
});

exports.reviewSchema = Joi.object({
  rating: Joi.number().required().min(1).max(5),
  reviewBody: Joi.string().required(),
});
