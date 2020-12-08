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

const searchRestaurant = async (args) => {
  console.log('search');
  const response = {};
  let search = await Restaurants.find({ name: args.search, delivery_method: args.filter });
  if (search.length > 0) {
    console.log('search');
    console.log(search);
    response.content = search[0].name;
    response.status = 200;
    return response;
  }
  search = await Restaurants.find({ location: args.search, delivery_method: args.filter });
  if (search.length > 0) {
    console.log('search');
    console.log(search);
    response.content = search[0].name;
    response.status = 200;
    return response;
  }
  if (search.length > 0) {
    search = await Restaurants.find({ 'menu.dish_name': args.search, delivery_method: args.filter });
    if (search.length > 0) {
      console.log('search');
      console.log(search);
      response.content = search[0].name;
      response.status = 200;
      return response;
    }
  }
  response.content = search.name;
  response.status = 400;
  return response;
};

module.exports = {
  updateRestaurant,
  addMenuItem,
  searchRestaurant,
};
// exports.updateRestaurant = updateRestaurant;
