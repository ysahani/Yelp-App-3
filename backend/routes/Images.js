const express = require('express');

const router = express.Router();
// const jwt = require('jsonwebtoken');
// const { secret } = require('../Utils/config');
const Customers = require('../Models/CustomerModel');
const Restaurants = require('../Models/RestaurantModel');
const ImageController = require('../ImageController');
// const { auth } = require("../utils/passport");
// auth();

router.post('/uploadImage', ImageController.uploadImageToS3);

router.post('/customerurl', (req, res) => {
  Customers.updateOne({ email: req.body.anEmail }, { $set: { url: req.body.url } }).exec((error, customer) => {
    if (error) {
      console.log(error);
      res.status(202).end('Error Occured');
    }
    console.log('Customer URL updated succesfully!');
    res.status(200).end('Succesful URL upload!');
  });
});

router.post('/getcustomerurl', (req, res) => {
  Customers.find({ email: req.body.email }).exec((error, customer) => {
    if (error) {
      console.log(error);
      res.status(202).end('Error Occured');
    }
    res.send(customer);
  });
});

router.post('/dishurl', (req, res) => {
  Restaurants.updateOne({ 'menu.dish_name': req.body.dish_namez }, { $set: { 'menu.$.url': req.body.url } }).exec((error, customer) => {
    if (error) {
      console.log(error);
      res.status(202).end('Error Occured');
    }
    console.log('Dish URL set succesfully!');
    res.status(200).end('Succesful update in order!');
  });
});

module.exports = router;
