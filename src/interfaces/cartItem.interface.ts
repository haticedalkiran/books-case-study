import { CartBook } from './cartBook.interface';

export interface CartItem extends CartBook {
  quantity: number;
}
