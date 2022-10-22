const mongooose = require("mongoose");
const Review = require("./review");
const Schema = mongooose.Schema;

// In this project we are not using mongooseSchema to validate the req.body, instead we are making use of Joi

const ImageSchema = new Schema({
  url: String,
  filename: String,
  thumbnail: String,
});

const campgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

campgroundSchema.post("findOneAndDelete", async (camp) => {
  if (camp) {
    await Review.deleteMany({
      _id: { $in: camp.reviews },
    });
  }
});

const Campground = mongooose.model("Campground", campgroundSchema);
module.exports = Campground;
