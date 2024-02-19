import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GET_STORES } from '../gql';
import { useNavigation } from '@react-navigation/native';

/* Hook that handles users forms **/
export function useStores() {
  const { loading, error, data } = useQuery(GET_STORES);

  const filterFeaturedStores = useCallback(() => {
    if (data && data.getMinorityBusiness) {
      return data.getMinorityBusiness.filter(
        (store) => store.render_type === 'featured'
      );
    } else {
      return [];
    }
  }, [data]);

  const filterShopStores = useCallback(() => {
    if (data && data.getMinorityBusiness) {
      return data.getMinorityBusiness.filter(
        (store) => store.render_type === 'shop'
      );
    } else {
      return [];
    }
  }, [data]);

  const filterRestaurants = useCallback(() => {
    if (data && data.getMinorityBusiness) {
      return data.getMinorityBusiness.filter(
        (store) => store.render_type === 'restaurant'
      );
    } else {
      return [];
    }
  }, [data]);

  const filterServices = useCallback(() => {
    if (data && data.getMinorityBusiness) {
      return data.getMinorityBusiness.filter(
        (store) => store.render_type === 'service'
      );
    } else {
      return [];
    }
  }, [data]);

  return {
    featured: filterFeaturedStores(),
    shops: filterShopStores(),
    restaurants: filterRestaurants(),
    services: filterServices(),
  };
}
