const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  location: String,
  description: String,
  reviews: [
    {
      type: Schema.Types.ObjectId, ref: "Review"
    }
  ]
});

module.exports = mongoose.model('campground', campgroundSchema);
