const Restaurants = require('../Models/RestaurantModel');

const loginRestaurant = async (args) => {
  const response = {};
  await Restaurants.findOne({ email: args.email, password: args.password }, (error, user) => {
    if (error) {
      console.log('ERROR');
      response.status = 202;
      return response;
    }
    if (user) {
      console.log('Login Succesful!');
      // response.name = user.name;
      // response.email = user.email;
      // response.location = user.location;
      // response.timings = user.timing;
      // response.description = user.description;
      // response.persona = 'restaurant';
      response.content = (JSON.stringify(user));
      response.status = 200;
      return response;
    }
    response.status = 401;
    return response;
  }).then((res) => res);
  return response;
};

exports.loginRestaurant = loginRestaurant;
