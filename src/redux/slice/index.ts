import { CartActionType, CartStateType } from '@/interfaces/inretfaces';
import { createSlice } from '@reduxjs/toolkit';

const initCartState: CartStateType = { cart: [] };

const cartSlice = createSlice({
  initialState: initCartState,
  name: 'cart',
  reducers: {
    addProduct: (state: CartStateType, action: CartActionType) => {
      const cartItem = state.cart.find(
        (item) => item.product._id === action.payload.product._id
      );
      if (cartItem) {
        state.cart.forEach((item) => {
          if (item.product._id === cartItem.product._id) {
            item.count += action.payload.count;
            item.productPrice = item.count * item.product.price;
          }
        });
      } else {
        state.cart = [action.payload, ...state.cart];
      }
      state.totalprice = state.cart.reduce((sum, item) => sum + item.productPrice, 0);
    },
    deleteProduct: (state: CartStateType, action: CartActionType) => {
      state.cart = state.cart.filter(
        (item) => item.product._id !== action.payload.product._id
        );
        state.totalprice = state.cart.reduce(
          (sum, item) => sum + item.productPrice,
          0
        );
    },
    updateProduct: (state: CartStateType, action: CartActionType) => {
      state.cart.forEach((item) => {
        if (item.product._id === action.payload.product._id) {
          item.count = action.payload.count;
          item.productPrice = item.count * item.product.price;
        }
      });
      state.totalprice = state.cart.reduce((sum, item) => sum + item.productPrice, 0);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
