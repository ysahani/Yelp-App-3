const Restaurants = require('../Models/RestaurantModel');
const Customers = require('../Models/CustomerModel');

const signUp = async (args) => {
  const {
    name, email, password, location, persona,
  } = args;
  const user = (persona === 'customer') ? Customers : Restaurants;
  const response = {};
  const data = await new user({
    name, email, password, location, persona,
  }).save();
  if (!data) {
    response.content = ('Sign up Error');
    response.status = 401;
  } else {
    response.content = (JSON.stringify(data));
    response.status = 200;
  }
  return response;
};

exports.signUp = signUp;
