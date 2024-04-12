import { gql } from '@apollo/client';

export const GET_STORES = gql`
  query GetMinorityBusiness($zipCode: String!) {
    getMinorityBusiness(zip_code: $zipCode) {
      address
      city
      cover_image
      distance
      is_featured
      is_online
      is_pending
      long
      lat
      name
      rating_count
      rating
      profile_image
      sid
      state
      type
      zip_code
      section {
        ... on MenuSectionObject {
          type
          sections {
            dishes {
              id
              name
              description
              price
              image_url
              rating
              out_of_stock
            }
            name
          }
        }
        ... on StoreItemSection {
          type
          sections {
            name
            items {
              id
              name
              price
              image_url
              size
              out_of_stock
            }
          }
        }
      }
    }
  }
`;
