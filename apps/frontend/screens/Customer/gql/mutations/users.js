import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Mutation($user: User) {
    RegisterUser(user: $user) {
      message
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
