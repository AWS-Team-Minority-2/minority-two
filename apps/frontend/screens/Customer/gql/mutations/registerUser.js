import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($input: UserInput!) {
    addUserData(input: $input) {
      address
      email
      firstName
      lastName
      password
      uuid
    }
  }
`;
