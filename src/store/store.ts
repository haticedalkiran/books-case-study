import { BooksService } from '@/service/books.service';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartState from './cart.state';

const rootReducer = combineReducers({
  cart: cartState,
  [BooksService.reducerPath]: BooksService.reducer,
});

const middlewares = [BooksService.middleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});
