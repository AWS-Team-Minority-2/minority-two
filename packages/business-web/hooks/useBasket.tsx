import React, { createContext, useContext, useReducer } from 'react';
import {
  BusinessProvider,
  CartItemState,
  CartItem,
} from '@min-two/business-iso';
import { Cart } from './locals';

type BasketState = Cart;

interface Action {
  type: string;
  payload?: any;
}

const BasketStateContext = createContext<BasketState | undefined>(undefined);
const BasketDispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined
);

function basketReducer(state: BasketState, action: Action): BasketState {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'SET_STORE':
      return {
        ...state,
        business: action.payload,
      };
    case 'REMOVE_CURRENT':
      return {
        items: [],
        business: null,
      };
    case 'REMOVE_FROM_BASKET':
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.items.splice(index, 1);
        return {
          ...state,
          items: [...state.items],
        };
      } else {
        console.warn(
          `Item with id: ${action.payload.id} not found in the basket.`
        );
        return state;
      }
    case 'GET_ITEMS':
      return state; // Simply return the current state which includes all items
    case 'SET_BASKET_FUNCTION':
      return {
        ...state,
        items: action.payload.items, // Corrected to access action.payload.items
        business: action.payload.store, // Corrected to access action.payload.items
      };
    default:
      return state;
  }
}

function BasketProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(basketReducer, initialState);

  return (
    <BasketStateContext.Provider value={state}>
      <BasketDispatchContext.Provider value={dispatch}>
        {children}
      </BasketDispatchContext.Provider>
    </BasketStateContext.Provider>
  );
}

function useBasketState(): BasketState {
  const context = useContext(BasketStateContext);
  if (context === undefined) {
    throw new Error('useBasketState must be used in BasketProvider');
  }
  return context;
}

function useBasketDispatch(): React.Dispatch<Action> {
  const context = useContext(BasketDispatchContext);
  if (context === undefined) {
    throw new Error('useBasketDispatch must be used in BasketProvider');
  }
  return context;
}

const initialState: BasketState = {
  items: [],
  business: null,
};

function addToBasket(dispatch: React.Dispatch<Action>, item: CartItem) {
  dispatch({ type: 'ADD_TO_BASKET', payload: item });
}

function removeFromBasket(state, dispatch: React.Dispatch<Action>, id: string) {
  dispatch({ type: 'REMOVE_FROM_BASKET', payload: { id } });
}

function setBusiness(
  dispatch: React.Dispatch<Action>,
  store: BusinessProvider
) {
  dispatch({ type: 'SET_STORE', payload: { store } });
}

function setBasketFromCart(
  dispatch: React.Dispatch<Action>,
  items: CartItemState,
  store: BusinessProvider
) {
  dispatch({
    type: 'SET_BASKET_FUNCTION',
    payload: {
      items: items,
      store: store,
    },
  });
}

function removeCurrent(dispatch: React.Dispatch<Action>) {
  dispatch({ type: 'REMOVE_CURRENT' });
}

export const selectBasketTotal = (state) => {
  if (!state || !state.items) return 0; // Check if state or state.items is undefined
  return state.items.reduce((total, item) => total + parseFloat(item.price), 0);
};

function selectBasketItems(state: BasketState) {
  return state.items;
}

// function getStoreName(state: BasketState): string {
//   return state.store.storeName;
// }

export {
  BasketProvider,
  useBasketState,
  useBasketDispatch,
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  setBusiness,
  removeCurrent,
  setBasketFromCart,
};
