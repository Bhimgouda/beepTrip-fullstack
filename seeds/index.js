if (process.env.NODE_ENV !== "production") require("dotenv").config();
// const mongoose = require("mongoose");
// const Campground = require("../models/campground");
// const location = require("./cities");
// const { descriptors, places } = require("./seedHelpers");

const dbUrl = process.env.MONGODB_URI;

// mongoose
//   .connect(dbUrl)
//   .then(() => console.log("SEEDED DATA"))
//   .catch((err) => console.log(err));

// const sample = (array) => {
//   return array[Math.floor(Math.random() * array.length)];
// };

// const seedDB = async () => {
//   await Campground.deleteMany();
//   for (let i = 0; i < 50; i++) {
//     const rand1000 = Math.floor(Math.random() * 1000);
//     const price = Math.floor(Math.random() * 20) + 10;
//     const camp = new Campground({
//       location: `${location[rand1000].city}, ${location[rand1000].state}`,
//       title: `${sample(descriptors)} ${sample(places)}`,
//       images: [
//         {
//           url: "https://res.cloudinary.com/ddmnigwse/image/upload/v1666333657/beepTrip/xxgxcxgayk8pmdwe55yv.webp",
//           filename: "beepTrip/xxgxcxgayk8pmdwe55yv",
//         },
//         {
//           url: "https://res.cloudinary.com/ddmnigwse/image/upload/v1666333658/beepTrip/jbw92dersqzdxtxsdtoi.jpg",
//           filename: "beepTrip/jbw92dersqzdxtxsdtoi",
//         },
//         {
//           url: "https://res.cloudinary.com/ddmnigwse/image/upload/v1666333659/beepTrip/autbrxvkp6q03dzqj3zp.jpg",
//           filename: "beepTrip/autbrxvkp6q03dzqj3zp",
//         },
//         {
//           url: "https://res.cloudinary.com/ddmnigwse/image/upload/v1666333667/beepTrip/xhas5yqawk7pgl0fxctz.jpg",
//           filename: "beepTrip/xhas5yqawk7pgl0fxctz",
//         },
//       ],
//       description:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae laboriosam quia iusto corporis similique recusandae magnam perferendis ipsa nulla id!",
//       price,
//       author: "63c23b3a4f4ef2c858e25462",
//     });
//     camp.images.forEach((image) => {
//       image.thumbnail = image.url.replace("/upload", "/upload/w_100");
//     });
//     await camp.save();
//   }
//   await mongoose.connection.close();
// };

// seedDB();

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const images = require("./images")

mongoose
  .connect(dbUrl)
  .then(() => console.log("SEEDED DATA"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 100; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const imagesNum = Math.floor(Math.random()*5)

        const camp = new Campground({
            //YOUR USER ID
            author: '5f5c330c2cd79d538f2c66d9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: images
        })

        // Just to add randomness to 1st image
        camp.images.unshift(images[imagesNum])

        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
