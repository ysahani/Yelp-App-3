const graphql = require('graphql');
const { argsToArgsConfig } = require('graphql/type/definition');
const { signUp } = require('../mutations/SignUp');
const { loginRestaurant } = require('../mutations/LoginRestaurant');
const { loginCust } = require('../mutations/LoginCustomer');
const {
  updateRestaurant, addMenuItem, searchRestaurant, updateOrder, makeReview,
} = require('../mutations/Restaurant');
const { updateCust, placeOrder } = require('../mutations/Customer');
const Restaurants = require('../Models/RestaurantModel');
const Customers = require('../Models/CustomerModel');

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

const CustomerOrder = new GraphQLObjectType({
  name: 'CustomerOrder',
  fields: () => ({
    items: { type: GraphQLString },
    r_name: { type: GraphQLString },
    date_time: { type: GraphQLString },
    delivery_option: { type: GraphQLString },
    real_datetime: { type: GraphQLString },
    order_option: { type: GraphQLString },
    cName: { type: GraphQLString },
  }),
});

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
    delivery_method: { type: GraphQLString },
    menu: { type: new GraphQLList(RestaurantMenu) },
    events: { type: new GraphQLList(RestaurantEvents) },
  }),
});

const Reviews = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    date: { type: GraphQLString },
    rating: { type: GraphQLString },
    comments: { type: GraphQLString },
    r_name: { type: GraphQLString },
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

    orders: {
      type: new GraphQLList(CustomerOrder),
      args: { name: { type: GraphQLString } },
      async resolve(parent, args) {
        const order = await Customers.find({ 'orders.r_name': args.name });
        if (order) {
          const data = [];
          order.forEach((element) => {
            // console.log(element);
            element.orders.forEach((thing) => {
              // console.log(thing);
              data.push(thing);
            });
          });
          console.log(data);
          return data;
        }
      },
    },

    customerOrders: {
      type: new GraphQLList(CustomerOrder),
      args: { name: { type: GraphQLString } },
      async resolve(parent, args) {
        const order = await Customers.find({ name: args.name });
        const data = [];
        if (order) {
          order.forEach((element) => {
            element.orders.forEach((thing) => {
              // console.log(thing);
              data.push(thing);
            });
          });
          // console.log(data);
          return data;
        }
      },
    },

    reviews: {
      type: new GraphQLList(Reviews),
      args: { r_name: { type: GraphQLString } },
      async resolve(parent, args) {
        const review = await Customers.find({ 'reviews.r_name': args.r_name });
        const data = [];
        if (review) {
          review.forEach((element) => {
            element.reviews.forEach((thing) => {
              // console.log(thing);
              data.push(thing);
            });
          });
          console.log(data);
          return data;
        }
      },
    },

    filterOrders: {
      type: new GraphQLList(CustomerOrder),
      args: { order_option: { type: GraphQLString } },
      async resolve(parent, args) {
        let search;
        if (args.order_option === 'Delivered Orders') {
          search = 'Delivered';
        } else if (args.order_option === 'New Orders') {
          search = 'Order Recieved';
        } else if (args.order_option === 'Cancelled Orders') {
          search = 'Cancel';
        }
        let filterOrder = await Customers.find({ 'orders.order_option': search });
        if (args.order_option === 'All orders') {
          filterOrder = await Customers.find({});
        }
        if (filterOrder) {
          const data = [];
          filterOrder.forEach((element) => {
            // console.log(element);
            element.orders.forEach((thing) => {
              // console.log(thing);
              data.push(thing);
            });
          });
          console.log(data);
          return data;
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

    loginCust: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return loginCust(args);
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

    updateCust: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        yelpingSince: { type: GraphQLString },
        thingsILove: { type: GraphQLString },
        findMeIn: { type: GraphQLString },
        blogsite: { type: GraphQLString },
        dob: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        nickname: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return updateCust(args);
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

    searchRestaurant: {
      type: StatusType,
      args: {
        search: { type: GraphQLString },
        filter: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return searchRestaurant(args);
      },
    },

    placeOrder: {
      type: StatusType,
      args: {
        cname: { type: GraphQLString },
        items: { type: GraphQLString },
        r_name: { type: GraphQLString },
        date_time: { type: GraphQLString },
        delivery_option: { type: GraphQLString },
        real_datetime: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return placeOrder(args);
      },
    },

    updateOrder: {
      type: StatusType,
      args: {
        items: { type: GraphQLString },
        order_option: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return updateOrder(args);
      },
    },

    makeReview: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        date: { type: GraphQLString },
        rating: { type: GraphQLString },
        comments: { type: GraphQLString },
        r_name: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return makeReview(args);
      },
    },

  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
