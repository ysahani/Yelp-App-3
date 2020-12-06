const graphql = require('graphql');
const { signUp } = require('../mutations/SignUp');
const { loginRestaurant } = require('../mutations/LoginRestaurant');
const { updateRestaurant } = require('../mutations/Restaurant');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const RestaurantMenu = new GraphQLObjectType({
  name: 'RestaurantMenu',
  fields: () => ({
    dishName: { type: GraphQLString },
    ingredients: { type: GraphQLString },
    price: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

const RestaurantEvents = new GraphQLObjectType({
  name: 'RestaurantEvents',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    time: { type: GraphQLString },
    date: { type: GraphQLString },
    location: { type: GraphQLString },
    hashtags: { type: GraphQLString },
  }),
});

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    location: { type: GraphQLString },
    timings: { type: GraphQLString },
    description: { type: GraphQLString },
    menu: { type: new GraphQLList(RestaurantMenu) },
    events: { type: new GraphQLList(RestaurantEvents) },
  }),
});

// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   description: 'Root Query',
// });
const StatusType = new GraphQLObjectType({
  name: 'Status',
  fields: () => ({
    status: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
});
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    items: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        return 1;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signUp: {
      type: StatusType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        location: { type: GraphQLString },
        persona: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return signUp(args);
      },
    },

    loginRestaurant: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return loginRestaurant(args);
      },
    },

    updateRestaurant: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
        timings: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return updateRestaurant(args);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
