// const express = require('express');

// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const { secret } = require('../Utils/config');
// const Restaurants = require('../Models/RestaurantModel');
// const Customers = require('../Models/CustomerModel');
// const { auth } = require('../Utils/passport');

// auth();

// // Route to handle Post Request Call
// router.post('/login', (req, res) => {
//   Restaurants.findOne({ email: req.body.user, password: req.body.pass }, (error, user) => {
//     if (error) {
//       res.status(202).end('Error Occured');
//     }
//     if (user) {
//       console.log('Login Succesful!');
//       const payload = {
//         _id: user._id, name: user.name, email: user.email, location: user.location, timings: user.timings, description: user.description, persona: 'restaurant',
//       };
//       const token = jwt.sign(payload, secret, {
//         expiresIn: 108000,
//       });
//       res.status(200).end(`JWT ${token}`);
//     } else {
//       console.log('not user!');
//     }
//   });
//   Customers.findOne({ email: req.body.user, password: req.body.pass }, (error, user) => {
//     if (error) {
//       res.status(202).end('Error Occured');
//     }
//     if (user) {
//       console.log('Login Succesful!');
//       // res.send({
//       //   cname: user.name, email: user.email, yelpingSince: user.yelpingSince, thingsILove: user.thingsILove, findMeIn: user.findMeIn, blogsite: user.blogsite, dob: user.dob, city: user.city, state: user.state, country: user.country, nickname: user.nickname, phone: user.phone, persona: 'customer',
//       // });
//       const payload = {
//         _id: user._id, cname: user.name, email: user.email, yelpingSince: user.yelpingSince, thingsILove: user.thingsILove, findMeIn: user.findMeIn, blogsite: user.blogsite, dob: user.dob, city: user.city, state: user.state, country: user.country, nickname: user.nickname, phone: user.phone, persona: 'customer',
//       };
//       const token = jwt.sign(payload, secret, {
//         expiresIn: 108000,
//       });
//       res.status(200).end(`JWT ${token}`);
//     } else {
//       res.status(202).end('User not found!');
//     }
//   });
// });

// module.exports = router;
