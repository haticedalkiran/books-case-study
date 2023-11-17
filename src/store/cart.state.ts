import { CartBook } from '@/interfaces/cartBook.interface';
import { CartItem } from '@/interfaces/cartItem.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    removeItem: (state, action) => {},
    updateQuantity: (state, action) => {},
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
