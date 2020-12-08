const Restaurants = require('../Models/RestaurantModel');
const Customers = require('../Models/CustomerModel');

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

const updateOrder = async (args) => {
  const response = {};
  // await Customers.updateOne({ 'orders.items': args.items }, { $set: { 'orders.$.order_option': args.order_option } }).exec((error, customer) => {
  //   if (error) {
  //     console.log(error);
  //     response.status = 202;
  //     return response;
  //   }
  //   console.log(customer);
  //   response.status = 200;
  //   return response;
  // });
  let data = await Customers.updateOne({ 'orders.items': args.items }, { $set: { 'orders.$.order_option': args.order_option } });
  if (data) {
    response.status = 200;
    return response;
  }
  return response;
};

const makeReview = async (args) => {
  const response = {};
  const myquery = { email: args.email };
  const newvalues = {
    $push: {
      reviews: {
        date: args.date, rating: args.rating, comments: args.comments, r_name: args.r_name,
      },
    },
  };
  await Customers.updateOne(myquery, newvalues, (error, restaurant) => {
    if (error) {
      console.log(error);
      response.status = 202;
    }
    if (restaurant) {
      console.log('Added customer review!');
      response.status = 200;
    }
  });
  return response;
};

module.exports = {
  updateRestaurant,
  addMenuItem,
  searchRestaurant,
  updateOrder,
  makeReview,
};
// exports.updateRestaurant = updateRestaurant;
