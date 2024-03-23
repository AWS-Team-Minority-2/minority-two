import { gql } from '@apollo/client';

export const GET_STORES = gql`
  query GetMinorityBusiness($zipCode: String!) {
    getMinorityBusiness(zip_code: $zipCode) {
      name
      cover_image
      address
      city
      state
      zip_code
      long
      lat
      is_online
      type
      is_featured
      is_pending
      sid
      profile_image
      rating_count
      rating
      distance
      section {
        sections {
          name
          dishes {
            id
            name
            description
            price
            image_url
            rating
            out_of_stock
          }
        }
        type
      }
    }
  }
`;
