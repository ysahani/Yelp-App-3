const graphql = require('graphql');
const { signUp } = require('../routes/SignUp');

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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addRestaurant: {
      type: RestaurantType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        location: { type: GraphQLString },
        timings: { type: GraphQLString },
        description: { type: GraphQLString },
        menu: { type: new GraphQLList(RestaurantMenu) },
        events: { type: new GraphQLList(RestaurantEvents) },
      },
      async resolve(parent, args) {
        return signUp(args);
      },
    },
  },
});

const schema = new GraphQLSchema({
  // query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
