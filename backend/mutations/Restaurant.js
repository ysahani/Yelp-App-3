const Restaurants = require('../Models/RestaurantModel');

const updateRestaurant = async (args) => {
  const response = {};
  const myquery = { email: args.email };
  const newvalues = {
    $set: {
      name: args.name, location: args.location, description: args.description, timings: args.timings,
    },
  };
  await Restaurants.updateOne(myquery, newvalues, (error, restaurant) => {
    if (error) {
      console.log('Error in update profile');
      response.status = 202;
      return response;
    }
    if (restaurant) {
      console.log('Restaurant profile updated!');
      response.status = 200;
      return response;
    }
    return response;
  }).then((res) => res);
  return response;
};

exports.updateRestaurant = updateRestaurant;
