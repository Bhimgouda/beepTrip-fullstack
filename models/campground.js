const mongooose = require("mongoose");
const Review = require("./review");
const Schema = mongooose.Schema;

// In this project we are not using mongooseSchema to validate the req.body, instead we are making use of Joi

const ImageSchema = new Schema({
  url: String,
  filename: String,
  thumbnail: String,
});
const opts = {toJSON: {virtuals: true}};

const campgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
  price: Number,
  description: String,
  location: String,
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates:{
      type: [Number],
      required: true,
    }
  },
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
}, opts);

// A Virtual property for Map

campgroundSchema.virtual("properties.popUpMarkup").get(function(){
  return `
  <a class=popUp class href="/campgrounds/${this._id}">
        <img class=popUp__image src="${this.images[0].url}" />
        <strong>${this.title}</strong>
  </a>
  `
})

campgroundSchema.post("findOneAndDelete", async (camp) => {
  if (camp) {
    await Review.deleteMany({
      _id: { $in: camp.reviews },
    });
  }
});

const Campground = mongooose.model("Campground", campgroundSchema);
module.exports = Campground;
