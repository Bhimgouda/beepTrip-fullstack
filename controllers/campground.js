const Campground = require("../models/campground");
const AppError = require("../utils/appError");
const { cloudinary } = require("../cloudinary");

exports.index = async (req, res) => {
  const campgrounds = await Campground.find();
  res.send({ campgrounds, session: req.session });
};

exports.showCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!campground) {
    throw new AppError("Not able to find this Campground", 404);
  }
  res.send(campground);
};

exports.createCamground = async (req, res) => {
  req.body.author = req.session.user_id; // Adding the user Id to campground of the user id who made the campground
  const camp = new Campground(req.body);
  camp.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
    thumbnail: f.path.replace("/upload", "/upload/w_100"),
  }));
  await camp.save();
  res.send(camp);
};

exports.editCampground = async (req, res) => {
  const { id } = req.params;
  req.body.author = req.session.user_id; // Adding the user Id to campground of the user id who made the campground
  const campground = await Campground.findOneAndUpdate(
    { _id: id, author: { _id: req.session.user_id } },
    { ...req.body }
  );
  const newImages = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
    thumbnail: f.path.replace("/upload", "/upload/w_100"),
  }));
  campground.images.push(...newImages);
  await campground.save();

  if (req.body.deleteImages) {
    for (filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }

  if (campground) res.send("Updated Successfully");
  else throw new AppError("You are not authorized to update Campground", 401);
};

exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.send("Deleted Successfully");
};
