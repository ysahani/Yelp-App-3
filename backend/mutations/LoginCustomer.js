const Customers = require('../Models/CustomerModel');

const loginCust = async (args) => {
  const response = {};
  await Customers.findOne({ email: args.email, password: args.password }, (error, user) => {
    if (error) {
      console.log('ERROR');
      response.status = 202;
      return response;
    }
    if (user) {
      console.log('Login Succesful!');
      response.content = (JSON.stringify(user));
      response.status = 200;
      return response;
    }
    response.status = 401;
    return response;
  }).then((res) => res);
  return response;
};

exports.loginCust = loginCust;
