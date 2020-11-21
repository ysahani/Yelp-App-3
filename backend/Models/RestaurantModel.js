const mongoose = require('mongoose');

const { Schema } = mongoose;

const menuSchema = new Schema({
  dish_name: String,
  ingredients: String,
  price: String,
  category: String,
  description: String,
  url: String,
});

const eventsSchema = new Schema({
  name: String,
  description: String,
  time: String,
  date: Date,
  location: String,
  hashtags: String,
});

const restaurantSchema = new Schema({
  name: String,
  email: String,
  password: String,
  location: String,
  timings: { type: String, required: false },
  description: { type: String, required: false },
  menu: [menuSchema],
  events: [eventsSchema],
},
{
  versionKey: false,
  strict: false,
});

module.exports = mongoose.model('restaurant', restaurantSchema);
