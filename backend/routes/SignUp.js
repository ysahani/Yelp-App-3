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

// const signUp = async (args) => {
//   const myobj = {
//     name: args.body.rname, email: args.body.user, password: args.body.pass, location: args.body.loc, timings: '', description: '',
//   };
//   const anobj = {
//     name: args.body.cname, email: args.body.user, password: args.body.pass, yelpingSince: '', thingsILove: '', findMeIn: '', blogsite: '', dob: '', city: '', state: '', country: '', nickname: '', phone: '', url: '',
//   };
//   if (args.body.pers === 'restaurant') {
//     Restaurants.create(myobj, (err, restaurant) => {
//       if (err) {
//         console.log('ERROR');
//         return { status: 401, message: 'NO_SIGNUP' };
//       }
//       console.log('1 RESTAURANT INSERTED!');
//       return { status: 200, message: 'YES_SIGNUP' };
//     });
//   } else if (args.body.pers === 'customer') {
//     Customers.create(anobj, (err, customer) => {
//       if (err) {
//         console.log('ERROR');
//         return { status: 401, message: 'NO_SIGNUP' };
//       }
//       console.log('1 CUSTOMER INSERTED!');
//       return { status: 200, message: 'YES_SIGNUP' };
//     });
//   }
// };

// const express = require('express');

// const router = express.Router();
// // const jwt = require('jsonwebtoken');
// // const { secret } = require('../Utils/config');
// const Restaurants = require('../Models/RestaurantModel');
// const Customers = require('../Models/CustomerModel');
// // const { auth } = require("../utils/passport");
// // auth();

// // Route to handle Post Request Call
// router.post('/signup', (req, res) => {
// const myobj = {
//   name: req.body.rname, email: req.body.user, password: req.body.pass, location: req.body.loc, timings: '', description: '',
// };
// const anobj = {
//   name: req.body.cname, email: req.body.user, password: req.body.pass, yelpingSince: '', thingsILove: '', findMeIn: '', blogsite: '', dob: '', city: '', state: '', country: '', nickname: '', phone: '', url: '',
// };
// if (req.body.pers === 'restaurant') {
//   Restaurants.create(myobj, (err, restaurant) => {
//     if (err) {
//       console.log('ERROR');
//       res.status(202).end('Unsuccessful login!');
//     } else {
//       console.log('1 RESTAURANT INSERTED!');
//       res.status(200).end('Successful login!');
//     }
//   });
// } else if (req.body.pers === 'customer') {
//   Customers.create(anobj, (err, customer) => {
//     if (err) {
//       console.log('ERROR');
//       res.status(202).end('Unsuccessful login!');
//     } else {
//       console.log('1 CUSTOMER INSERTED!');
//       res.status(200).end('Successful login!');
//     }
//   });
// }
// });
