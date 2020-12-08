import { gql } from 'apollo-boost';

const menu = gql`
    query($name: String) {
        menu(name: $name) {
            dish_name
            ingredients
            price
            category
            description
        }
    }
`;

const orders = gql`
    query($name: String) {
        orders(name: $name) {
            items
            r_name
            date_time
            delivery_option
            real_datetime
            order_option
            cName
        }
    }
`;

const filterOrders = gql`
    query($name: String) {
        filterOrders(name: $name) {
            items
            r_name
            date_time
            delivery_option
            real_datetime
            order_option
            cName
        }
    }
`;

const customerOrders = gql`
    query($name: String) {
        customerOrders(name: $name) {
            items
            r_name
            date_time
            delivery_option
            real_datetime
            order_option
            cName
        }
    }
`;

export {
  menu, orders, filterOrders, customerOrders,
};
