import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/slice';
import storage from 'redux-persist/es/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'cart',
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
});

export default store;
