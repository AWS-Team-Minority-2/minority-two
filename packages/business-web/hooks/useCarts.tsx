import React, { createContext, useContext, useReducer } from 'react';
import { Dish, Restaurant } from '@min-two/business-iso';

type Cart = {
  restaurant: Restaurant;
  items: Dish[];
};
interface CartsState {
  carts: Cart[] | null;
}

interface Action {
  type: string;
  payload?: any;
}

//  set resturant

//  Set resturants baksets and update savedBaskets, we may need another provider

const CartsStateContext = createContext<CartsState | undefined>(undefined);
const CartsDispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined
);

function cartsReducer(state: CartsState, action: Action): CartsState {
  switch (action.type) {
    case 'SET_CARTS':
      return {
        ...state,
        carts: [...state.carts, action.payload],
      };
    default:
      return state;
  }
}

function CartsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartsReducer, initialState);

  return (
    <CartsStateContext.Provider value={state}>
      <CartsDispatchContext.Provider value={dispatch}>
        {children}
      </CartsDispatchContext.Provider>
    </CartsStateContext.Provider>
  );
}

function useCartsState(): CartsState {
  const context = useContext(CartsStateContext);
  if (context === undefined) {
    throw new Error('Carts must be used in Provider');
  }
  return context;
}

function useCartsDispatch(): React.Dispatch<Action> {
  const context = useContext(CartsDispatchContext);
  if (context === undefined) {
    throw new Error('Carts must be used in Provider');
  }
  return context;
}

const initialState: CartsState = null;

function setCart(
  dispatch: React.Dispatch<Action>,
  restaurant: Restaurant | null
) {
  dispatch({ type: 'SET_CARTS', payload: restaurant });
}

export { CartsProvider, useCartsState, useCartsDispatch, setCart };
