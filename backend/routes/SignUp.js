const express = require('express');

const router = express.Router();
// const jwt = require('jsonwebtoken');
// const { secret } = require('../Utils/config');
const Restaurants = require('../Models/RestaurantModel');
const Customers = require('../Models/CustomerModel');
// const { auth } = require("../utils/passport");
// auth();

// Route to handle Post Request Call
router.post('/signup', (req, res) => {
  const myobj = {
    name: req.body.rname, email: req.body.user, password: req.body.pass, location: req.body.loc, timings: '', description: '',
  };
  const anobj = {
    name: req.body.cname, email: req.body.user, password: req.body.pass, yelpingSince: '', thingsILove: '', findMeIn: '', blogsite: '', dob: '', city: '', state: '', country: '', nickname: '', phone: '', url: '',
  };
  if (req.body.pers === 'restaurant') {
    Restaurants.create(myobj, (err, restaurant) => {
      if (err) {
        console.log('ERROR');
        res.status(202).end('Unsuccessful login!');
      } else {
        console.log('1 RESTAURANT INSERTED!');
        res.status(200).end('Successful login!');
      }
    });
  } else if (req.body.pers === 'customer') {
    Customers.create(anobj, (err, customer) => {
      if (err) {
        console.log('ERROR');
        res.status(202).end('Unsuccessful login!');
      } else {
        console.log('1 CUSTOMER INSERTED!');
        res.status(200).end('Successful login!');
      }
    });
  }
});

module.exports = router;
