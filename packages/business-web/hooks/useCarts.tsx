import React, { createContext, useContext, useReducer } from 'react';
import { Cart } from './locals';

type CartsState = Cart[];

interface Action {
  type: string;
  payload?: any;
}

const CartsStateContext = createContext<CartsState | undefined>(undefined);
const CartsDispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined
);

function cartsReducer(state: CartsState, action: Action): CartsState {
  switch (action.type) {
    case 'SET_CARTS':
      const { restaurant, items } = action.payload;
      const existingCartIndex = state.findIndex(
        (cart) => cart.restaurant.id === restaurant.id
      );

      if (existingCartIndex !== -1) {
        // If the restaurant already exists in the cart list, update its items
        const updatedState = [...state];
        updatedState[existingCartIndex] = {
          ...state[existingCartIndex],
          items,
        };
        return updatedState;
      } else {
        // Otherwise, add a new entry to the cart list
        return [...state, action.payload];
      }

    case 'REMOVE_CARTS':
      const cartToRemoveIndex = state.findIndex(
        (cart) => cart.restaurant.id === action.payload.restaurant.id
      );

      if (cartToRemoveIndex !== -1) {
        const updatedState = [...state];
        updatedState.splice(cartToRemoveIndex, 1);
        return updatedState;
      } else {
        return state;
      }

    // console.log(cartToRemoveIndex);

    case 'SET_CARTS_MOUNT':
      return action.payload;

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

const initialState: CartsState = [];

function setCart(dispatch: React.Dispatch<Action>, cart: Cart) {
  dispatch({ type: 'SET_CARTS', payload: cart });
}

function removeCart(dispatch: React.Dispatch<Action>, cart: Cart) {
  dispatch({ type: 'REMOVE_CARTS', payload: cart });
}

function setCartOnMount(dispatch: React.Dispatch<Action>, carts) {
  dispatch({ type: 'SET_CARTS_MOUNT', payload: carts });
}

export {
  CartsProvider,
  useCartsState,
  useCartsDispatch,
  setCart,
  setCartOnMount,
  removeCart,
};
