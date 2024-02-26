import { gql } from '@apollo/client';

export const LOGIN_ADMIN = gql`
  mutation LoginAdmin($adminCode: String) {
    LoginAdmin(adminCode: $adminCode) {
      name
    }
  }
`;
