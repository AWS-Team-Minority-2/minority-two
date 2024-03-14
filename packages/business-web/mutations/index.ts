import { gql } from '@apollo/client';

export const GET_STORES = gql`
  query GetMinorityBusiness($zipCode: String!) {
    getMinorityBusiness(zip_code: $zipCode) {
      address
      city
      cover_image
      is_online
      is_pending
      lat
      long
      name
      render_type
      sid
      state
      zip_code
    }
  }
`;
