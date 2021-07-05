const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedhelper');
const campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', () => {
  console.log('DATABASE CONNECTED.');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  // DELETE CAMPGROUND DATABASE
  await campground.deleteMany({});
  // SEED NEW DATABASE
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: 'https://source.unsplash.com/collection/483251',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cupiditate ullam optio. Ad ea culpa dolorem laborum quasi tempore quam temporibus, sed excepturi consequatur recusandae. Molestiae, ab. Perferendis, magni tempora.',
      price,
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
