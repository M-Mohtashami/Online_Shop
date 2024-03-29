import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/slice';
import {
  PersistConfig,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { CartStateType } from '@/interfaces/inretfaces';
import { WebStorage } from 'redux-persist/lib/types';

const persistConfig: PersistConfig<CartStateType, string, number, WebStorage> =
  {
    key: 'cart',
    version: 1,
    storage,
  };

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
