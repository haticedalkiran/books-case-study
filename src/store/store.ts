import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { BooksService } from '@/service/books.service';
import cartState from './cart.state';
import checkoutState from './checkout.state';

const rootReducer = combineReducers({
  cart: cartState,
  checkout: checkoutState,
  [BooksService.reducerPath]: BooksService.reducer,
});

const middlewares = [BooksService.middleware];

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});
