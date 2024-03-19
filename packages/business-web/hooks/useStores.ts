import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GET_STORES } from '../mutations/index';

/* Hook that handles users forms **/

// TODO: move to iso if necessary

interface Store {
  city: string;
  cover_image: string;
  is_online: boolean;
  lat: string;
  long: string;
  name: string;
  type: 'restaurant' | 'service' | 'shop';
  is_featured: boolean;
  state: string;
  zip_code: number;
  is_pending: boolean;
  sid: string;
  profile_image: string;
  rating: string;
  rating_count: number;
  distance: string;
}
interface S {
  getMinorityBusiness: Store[];
}

// intercept the user zipcome here and pass to backend
export function useStores(zipCode: string) {
  const { loading, error, data } = useQuery<S>(GET_STORES, {
    variables: { zipCode },
  });

  const filterFeaturedStores = useCallback(() => {
    if (data && data.getMinorityBusiness) {
      return data.getMinorityBusiness.filter(
        (store: Store) =>
          store.is_featured !== false && store.is_pending != true
      );
    } else {
      return [];
    }
  }, [data]);

  const filterShopStores = useCallback(() => {
    if (data && data.getMinorityBusiness) {
      return data.getMinorityBusiness.filter(
        (store: Store) => store.type === 'shop' && store.is_pending != true
      );
    } else {
      return [];
    }
  }, [data]);

  const filterRestaurants = useCallback(() => {
    if (data && data.getMinorityBusiness) {
      return data.getMinorityBusiness.filter(
        (store: Store) =>
          store.type === 'restaurant' && store.is_pending != true
      );
    } else {
      return [];
    }
  }, [data]);

  const filterServices = useCallback(() => {
    if (data && data.getMinorityBusiness) {
      return data.getMinorityBusiness.filter(
        (store: Store) => store.type === 'service' && store.is_pending != true
      );
    } else {
      return [];
    }
  }, [data]);

  const getPending = useCallback(() => {
    if (data && data.getMinorityBusiness) {
      return data.getMinorityBusiness.filter(
        (store: Store) => store.is_pending
      );
    } else {
      return [];
    }
  }, [data]);

  const filterVerifiedBusinesses = useCallback(() => {
    if (data && data.getMinorityBusiness) {
      return data.getMinorityBusiness.filter(
        (store: Store) => store.is_pending != true
      );
    } else {
      return [];
    }
  }, [data]);

  // const filterVerifiedBusinesses = useCallback(() => {
  //   if (data && data.getMinorityBusiness) {
  //     return data.getMinorityBusiness.filter(
  //       (store: Store) => !store.is_pending
  //     );
  //   } else {
  //     return [];
  //   }
  // }, [data]);

  return {
    featured: filterFeaturedStores(),
    shops: filterShopStores(),
    restaurants: filterRestaurants(),
    services: filterServices(),
    allBusiness: data?.getMinorityBusiness,
    pendingBusinesses: getPending(),
    verifiedBusinesses: filterVerifiedBusinesses(),
  };
}
