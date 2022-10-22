const mongoose = require("mongoose");
const Campground = require("../models/campground");
const location = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose
  .connect("mongodb://localhost:27017/beep-trip")
  .then(() => console.log("SEEDED DATA"))
  .catch((err) => console.log(err));

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany();
  for (let i = 0; i < 50; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${location[rand1000].city}, ${location[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/ddmnigwse/image/upload/v1666333657/beepTrip/xxgxcxgayk8pmdwe55yv.webp",
          filename: "beepTrip/xxgxcxgayk8pmdwe55yv",
        },
        {
          url: "https://res.cloudinary.com/ddmnigwse/image/upload/v1666333658/beepTrip/jbw92dersqzdxtxsdtoi.jpg",
          filename: "beepTrip/jbw92dersqzdxtxsdtoi",
        },
        {
          url: "https://res.cloudinary.com/ddmnigwse/image/upload/v1666333659/beepTrip/autbrxvkp6q03dzqj3zp.jpg",
          filename: "beepTrip/autbrxvkp6q03dzqj3zp",
        },
        {
          url: "https://res.cloudinary.com/ddmnigwse/image/upload/v1666333667/beepTrip/xhas5yqawk7pgl0fxctz.jpg",
          filename: "beepTrip/xhas5yqawk7pgl0fxctz",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae laboriosam quia iusto corporis similique recusandae magnam perferendis ipsa nulla id!",
      price,
      author: "6347c18f974576c08028b737",
    });
    camp.images.forEach((image) => {
      image.thumbnail = image.url.replace("/upload", "/upload/w_100");
    });
    await camp.save();
  }
  await mongoose.connection.close();
};

seedDB();
