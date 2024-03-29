import React, { createContext, useContext, useReducer } from 'react';
import { Dish } from '@min-two/business-iso';

interface BasketState {
  items: Dish[];
}

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
};

function addToBasket(dispatch: React.Dispatch<Action>, dish: Dish) {
  dispatch({ type: 'ADD_TO_BASKET', payload: dish });
}

function removeFromBasket(dispatch: React.Dispatch<Action>, id: string) {
  dispatch({ type: 'REMOVE_FROM_BASKET', payload: { id } });
}

export const selectBasketTotal = (state) => {
  if (!state || !state.items) return 0; // Check if state or state.items is undefined
  return state.items.reduce((total, item) => total + item.price, 0);
};

function selectBasketItems(state: BasketState) {
  return state.items;
}

export {
  BasketProvider,
  useBasketState,
  useBasketDispatch,
  addToBasket,
  removeFromBasket,
  selectBasketItems,
};
