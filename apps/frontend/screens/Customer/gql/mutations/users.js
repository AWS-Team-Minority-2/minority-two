import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($user: UserInput) {
    RegisterUser(user: $user) {
      id
      userMetadata {
        firstname
        lastname
        phonenumber
        email
        address {
          street
          city
          state
          zipcode
        }
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($details: UserDetails) {
    LoginUser(details: $details) {
      id
      userMetadata {
        address {
          city
          state
          street
          zipcode
        }
        email
        firstname
        phonenumber
        lastname
      }
    }
  }
`;
