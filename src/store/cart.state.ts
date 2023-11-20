import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartBook } from '@/interfaces/cartBook.interface';
import { CartItem } from '@/interfaces/cartItem.interface';

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: CartBook; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }

      state.totalPrice += product.price * quantity;
    },
    removeItem: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem) {
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== productId);
      }
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += quantity;

        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== productId);
          state.totalPrice -= existingItem.price;
        } else {
          state.totalPrice += existingItem.price * quantity;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
