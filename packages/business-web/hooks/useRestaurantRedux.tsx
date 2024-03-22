import React, { createContext, useContext, useReducer } from 'react';
import { Restaurant } from '@min-two/business-iso';

interface RestaurantState {
  restaurant: Restaurant | null;
}

interface Action {
  type: string;
  payload?: any;
}

const RestaurantStateContext = createContext<RestaurantState | undefined>(
  undefined
);
const RestaurantDispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);

function restaurantReducer(
  state: RestaurantState,
  action: Action
): RestaurantState {
  switch (action.type) {
    case 'SET_RESTAURANT':
      return {
        ...state,
        restaurant: action.payload,
      };
    default:
      return state;
  }
}

function RestaurantProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(restaurantReducer, initialState);

  return (
    <RestaurantStateContext.Provider value={state}>
      <RestaurantDispatchContext.Provider value={dispatch}>
        {children}
      </RestaurantDispatchContext.Provider>
    </RestaurantStateContext.Provider>
  );
}

function useRestaurantState(): RestaurantState {
  const context = useContext(RestaurantStateContext);
  if (context === undefined) {
    throw new Error('useRestaurantState must be used in RestaurantProvider');
  }
  return context;
}

function useRestaurantDispatch(): React.Dispatch<Action> {
  const context = useContext(RestaurantDispatchContext);
  if (context === undefined) {
    throw new Error('useRestaurantDispatch must be used in RestaurantProvider');
  }
  return context;
}

const initialState: RestaurantState = {
  restaurant: {
    city: 'New York',
    cover_image: 'example_cover_image_url',
    is_online: true,
    lat: '40.7128',
    long: '-74.0060',
    name: 'Delicious Delights',
    type: 'restaurant',
    is_featured: true,
    state: 'NY',
    zip_code: 10001,
    is_pending: false,
    sid: 'restaurant123',
    profile_image: 'example_profile_image_url',
    rating: '4.5',
    rating_count: 200,
    distance: '0.5 miles',
  },
};

function setRestaurant(
  dispatch: React.Dispatch<Action>,
  restaurant: Restaurant | null
) {
  dispatch({ type: 'SET_RESTAURANT', payload: restaurant });
}

export {
  RestaurantProvider,
  useRestaurantState,
  useRestaurantDispatch,
  setRestaurant,
};
