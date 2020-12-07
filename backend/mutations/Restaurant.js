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

const addMenuItem = async (args) => {
  const response = {};
  const myquery = { name: args.name };
  const newvalues = {
    $push: {
      menu: {
        dish_name: args.dish_name, ingredients: args.ingredients, price: args.price, category: args.category, description: args.description,
      },
    },
  };
  Restaurants.updateOne(myquery, newvalues, (error, restaurant) => {
    if (error) {
      console.log(error);
      response.status = 401;
      return response;
    }
    if (restaurant) {
      console.log('Added menu item!');
      response.status = 200;
      return response;
    }
    return response;
  });

  return response;
};

module.exports = {
  updateRestaurant,
  addMenuItem,
};
// exports.updateRestaurant = updateRestaurant;
