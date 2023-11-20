import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { CartPage } from './pages/Cart.page';
import { BookDetail } from './pages/BookDetail.page';
import { AppLayout } from './layout/AppLayout';
import Checkout from './pages/Checkout.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'book/:id',
        element: <BookDetail />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
