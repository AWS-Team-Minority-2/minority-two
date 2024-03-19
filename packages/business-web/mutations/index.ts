import { gql } from '@apollo/client';

export const GET_STORES = gql`
  query GetMinorityBusiness($zipCode: String!) {
    getMinorityBusiness(zip_code: $zipCode) {
      address
      city
      is_online
      cover_image
      is_pending
      lat
      long
      name
      profile_image
      rating
      rating_count
      render_type
      sid
      state
      zip_code
      distance
    }
  }
`;
