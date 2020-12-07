import { gql } from 'apollo-boost';

const signUp = gql`
    mutation ($name: String, $email: String, $password: String, $location: String, $persona: String){
        signUp(name: $name, email: $email, password: $password, location: $location, persona: $persona ){
            status
        }
    }
`;

const loginRestaurant = gql`
    mutation ($email: String, $password: String){
        loginRestaurant(email: $email, password: $password){
            status
            content
        }
    }
`;

const loginCust = gql`
    mutation ($email: String, $password: String){
        loginCust(email: $email, password: $password){
            status
            content
        }
    }
`;

const updateRestaurant = gql`
    mutation ($email: String, $name: String, $location: String, $description: String, $timings: String){
        updateRestaurant(email: $email, name: $name, location: $location, description: $description, timings: $timings){
            status
            content
        }
    }
`;

const addMenuItem = gql`
    mutation ($name: String, $dish_name: String, $ingredients: String, $price: String, $category: String, $description: String){
        addMenuItem(name: $name, dish_name: $dish_name, ingredients: $ingredients, price: $price, category: $category, description: $description){
            status
        }
    }
`;

export {
  signUp, loginRestaurant, updateRestaurant, addMenuItem, loginCust,
};
