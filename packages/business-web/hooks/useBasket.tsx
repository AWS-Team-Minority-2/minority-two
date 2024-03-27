import React, { createContext, useContext, useReducer } from 'react';
import { Dish, RestaurantProvider } from '@min-two/business-iso';
import { Cart } from './locals';

// update resturant name
//  reove resturant -- if items in basket pushes to cart and empty in here

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
        // Assuming action.payload contains information about the store
        // store: action.payload.store,
      };
    case 'SET_STORE':
      return {
        ...state,
        restaurant: action.payload,
        // Assuming action.payload contains information about the store
        // store: action.payload.store,
      };

    case 'REMOVE_CURRENT':
      return {
        items: [],
        restaurant: null,
        // Assuming action.payload contains information about the store
        // store: action.payload.store,
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
  restaurant: null,
};

function addToBasket(dispatch: React.Dispatch<Action>, dish: Dish) {
  dispatch({ type: 'ADD_TO_BASKET', payload: dish });
}

function removeFromBasket(state, dispatch: React.Dispatch<Action>, id: string) {
  // const items = selectBasketItems(state);
  // console.log(items);

  dispatch({ type: 'REMOVE_FROM_BASKET', payload: { id } });
}

function setResturant(
  dispatch: React.Dispatch<Action>,
  store: RestaurantProvider
) {
  dispatch({ type: 'SET_STORE', payload: { store } });
}

function removeCurrent(dispatch: React.Dispatch<Action>) {
  dispatch({ type: 'REMOVE_CURRENT' });
}

export const selectBasketTotal = (state) => {
  if (!state || !state.items) return 0; // Check if state or state.items is undefined
  return state.items.reduce((total, item) => total + item.price, 0);
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
  setResturant,
  removeCurrent,
};
