const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const { mongoDB, frontendURL } = require('./Utils/config');

// use cors to allow cross origin resource sharing
app.use(cors({ origin: frontendURL, credentials: true }));

// use express session to maintain session data
app.use(session({
  secret: 'cmpe273_kafka_passport_mongo',
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000,
}));

app.use(bodyParser.json());

// Allow Access Control
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', frontendURL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log('MongoDB Connection Failed');
  } else {
    console.log('MongoDB Connected');
  }
});

const SignUp = require('./routes/SignUp');
const Login = require('./routes/Login');
const Restaurant = require('./routes/Restaurant');
const Customer = require('./routes/Customer');
const Images = require('./routes/Images');

// app.use('/user', SignUp);
// app.use('/user', Login);
// app.use('/restaurant', Restaurant);
// app.use('/customer', Customer);
// app.use('/images', Images);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// start your server on port 3001
app.listen(3001, () => console.log('Server Listening on port 3001'));