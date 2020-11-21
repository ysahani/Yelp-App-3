const mongoose = require('mongoose');

const { Schema } = mongoose;

const events = new Schema({
  event_name: String,
});

const reviews = new Schema({
  date: Date,
  rating: String,
  comments: String,
  r_name: String,
});

const orders = new Schema({
  items: String,
  r_name: String,
  date_time: Date,
  delivery_option: String,
  order_option: String,
  real_datetime: String,
});

const customerSchema = new Schema({
  email: String,
  name: String,
  password: String,
  yelpingSince: String,
  thingsILove: String,
  findMeIn: String,
  blogsite: String,
  dob: String,
  city: String,
  state: String,
  country: String,
  nickname: String,
  phone: String,
  url: String,
  events: [events],
  reviews: [reviews],
  orders: [orders],
},
{
  versionKey: false,
});

module.exports = mongoose.model('customer', customerSchema);
