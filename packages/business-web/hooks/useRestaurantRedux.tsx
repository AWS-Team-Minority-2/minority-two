import React, { createContext, useContext, useReducer } from 'react';
import { Dish, Restaurant } from '@min-two/business-iso';

interface RestaurantState {
  restaurant: Restaurant | null;
  items: Dish[] | null;
}

interface Action {
  type: string;
  payload?: any;
}

//  set resturant

//  Set resturants baksets and update savedBaskets, we may need another provider

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

const initialState: RestaurantState = null;

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
