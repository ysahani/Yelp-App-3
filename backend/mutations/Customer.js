const Customers = require('../Models/CustomerModel');

const updateCust = async (args) => {
  const response = {};
  const myquery = { email: args.email };
  const newvalues = {
    $set: {
      email: args.email, name: args.name, yelpingSince: args.yelpingSince, thingsILove: args.thingsILove, findMeIn: args.findMeIn, blogsite: args.blogsite, dob: args.dob, city: args.city, state: args.state, country: args.country, nickname: args.nickname, phone: args.phone,
    },
  };
  await Customers.updateOne(myquery, newvalues, (error, restaurant) => {
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

exports.updateCust = updateCust;
