const graphql = require('graphql');
const { signUp } = require('../mutations/SignUp');
const { loginRestaurant } = require('../mutations/LoginRestaurant');
const { updateRestaurant, addMenuItem } = require('../mutations/Restaurant');
const Restaurants = require('../Models/RestaurantModel');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = graphql;

const RestaurantMenuItems = new GraphQLObjectType({
  name: 'RestaurantMenuItems',
  fields: () => ({
    dish_name: { type: GraphQLString },
    ingredients: { type: GraphQLString },
    price: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const RestaurantMenu = new GraphQLObjectType({
  name: 'RestaurantMenu',
  fields: () => ({
    menu: {
      type: new GraphQLList(RestaurantMenuItems),
      resolve(parent, args) {
        return parent.items;
      },
    },
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
    menu: {
      type: new GraphQLList(RestaurantMenuItems),
      args: { name: { type: GraphQLString } },
      async resolve(parent, args) {
        const menu = await Restaurants.find({ name: args.name });
        if (menu) {
          console.log(menu[0].menu);
          return menu[0].menu;
        }
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

    addMenuItem: {
      type: StatusType,
      args: {
        name: { type: GraphQLString },
        dish_name: { type: GraphQLString },
        ingredients: { type: GraphQLString },
        price: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return addMenuItem(args);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
