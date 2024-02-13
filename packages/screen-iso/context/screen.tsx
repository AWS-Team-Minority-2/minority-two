import React, { createContext, useContext, useReducer } from 'react';

export type Screen =
  | 'Landing'
  | 'Login'
  | 'Register'
  | 'Profile'
  | 'Favorites'
  | 'Browse'
  | 'UserHome';

interface ScreenState {
  current: Screen;
}

interface Action {
  type: string;
  payload?: any;
}

const ScreenStateContext = createContext<ScreenState>({ current: 'Landing' });
const ScreenDispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined
);

function ScreenProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ScreenStateContext.Provider value={state}>
      <ScreenDispatchContext.Provider value={dispatch}>
        {children}
      </ScreenDispatchContext.Provider>
    </ScreenStateContext.Provider>
  );
}

// Define reducer function
function reducer(state: ScreenState, action: Action): ScreenState {
  switch (action.type) {
    case 'change':
      return { ...state, current: action.payload.screen };
    default:
      return state;
  }
}

function useScreenState(): ScreenState {
  const context = useContext(ScreenStateContext);
  if (context === undefined) {
    throw new Error('useScreenState must be used in AuthProvider');
  }
  return context;
}

function useScreenDispatch(): React.Dispatch<Action> {
  const context = useContext(ScreenDispatchContext);
  if (context === undefined) {
    throw new Error('useScreenDispatch must be used in AuthProvider');
  }
  return context;
}

const initialState: ScreenState = {
  current: 'Landing',
};

async function changeScreen(dispatch: React.Dispatch<Action>, screen: Screen) {
  try {
    dispatch({ type: 'change', payload: { screen } });
  } catch (error) {
    throw new Error('Screen refesued to change');
  }
}

export { ScreenProvider, useScreenState, useScreenDispatch, changeScreen };
