import { gql } from 'apollo-boost';

// eslint-disable-next-line import/prefer-default-export
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

export { signUp, loginRestaurant };
