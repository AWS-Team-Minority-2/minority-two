import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Mutation($user: User) {
    RegisterUser(user: $user) {
      message
    }
  }
`;
