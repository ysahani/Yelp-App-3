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

const placeOrder = async (args) => {
  const response = {};
  const myquery = { name: args.cname };
  const newvalues = {
    $push: {
      orders: {
        cname: args.cname, items: args.items, r_name: args.r_name, date_time: args.date_time, delivery_option: args.delivery_option, real_datetime: args.real_datetime, order_option: 'Order Recieved',
      },
    },
  };
  await Customers.updateOne(myquery, newvalues, (error, restaurant) => {
    if (error) {
      console.log(error);
      response.status = 202;
    }
    if (restaurant) {
      console.log('Placed order!');
      response.status = 200;
    }
  });
  return response;
};

module.exports = {
  updateCust,
  placeOrder,
};
// exports.updateCust = updateCust;
