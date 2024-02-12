import React, { createContext, useContext, useReducer } from 'react';

export type User = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  address: string;
  city: string;
  state: string;
  zipCode: number;
};

interface AuthState {
  status: 'logged-out' | 'logged-in' | 'rejected';
  user: User | null;
}

interface Action {
  type: string;
  payload?: any;
}

const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined
);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function reducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        status: 'logged-in',
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        status: 'logged-out',
        user: null,
      };
    case 'REJECTED':
      return {
        ...state,
        status: 'rejected',
        user: null,
      };
    default:
      return state;
  }
}

function useAuthState(): AuthState {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used in AuthProvider');
  }
  return context;
}

function useAuthDispatch(): React.Dispatch<Action> {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used in AuthProvider');
  }
  return context;
}

const initialState: AuthState = {
  status: 'logged-out',
  user: null,
};

async function doLogin(dispatch: React.Dispatch<Action>, user: User) {
  try {
    dispatch({ type: 'LOGIN', payload: { user } });
  } catch (error) {
    dispatch({ type: 'REJECTED', payload: { error } });
  }
}

function doLogout(dispatch: React.Dispatch<Action>) {
  dispatch({ type: 'LOGOUT' });
}

export { AuthProvider, useAuthState, useAuthDispatch, doLogin, doLogout };
