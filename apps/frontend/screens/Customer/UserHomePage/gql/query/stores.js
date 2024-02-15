import { gql } from '@apollo/client';

export const GET_STORES = gql`
  query GetMinorityBusiness {
    getMinorityBusiness {
      address
      city
      cover_image
      is_online
      name
      render_type
      state
      zip_code
      lat
      long
    }
  }
`;
