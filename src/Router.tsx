import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { CartPage } from './pages/Cart.page';
import { BookDetail } from './pages/BookDetail.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/book/:id',
    element: <BookDetail />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
