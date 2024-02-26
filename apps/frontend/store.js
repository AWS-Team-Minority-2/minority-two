import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import authReducer from './authReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  userData: persistReducer(persistConfig, userReducer),
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
