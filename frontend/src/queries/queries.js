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

export { menu };
