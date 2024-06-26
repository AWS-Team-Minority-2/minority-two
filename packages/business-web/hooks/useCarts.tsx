import React, { createContext, useContext, useReducer } from 'react';
import { Cart } from './locals';
import { CartItem } from '@min-two/business-iso';

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
      const { business, items } = action.payload;
      const existingCartIndex = state.findIndex(
        (cart) => cart.business.id === business.id
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
        (cart) => cart.business.id === action.payload.business.id
      );

      if (cartToRemoveIndex !== -1) {
        const updatedState = [...state];
        updatedState.splice(cartToRemoveIndex, 1);
        return updatedState;
      } else {
        return state;
      }

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

function getActiveStoreIds(state: CartsState): any {
  return state.map((cart) => cart.business.id);
}

function getItemsByStoreId(
  state: CartsState,
  storeId: string
): CartItem[] | undefined {
  const cart = state.find((cart) => cart.business.id === storeId);
  return cart ? Object.values(cart.items) : undefined;
}

export {
  CartsProvider,
  useCartsState,
  useCartsDispatch,
  setCart,
  setCartOnMount,
  removeCart,
  getActiveStoreIds,
  getItemsByStoreId,
};
