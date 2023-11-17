import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { CartPage } from './pages/Cart.page';
import { BookDetail } from './pages/BookDetail.page';
import { AppLayout } from './layout/AppLayout';

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
    ],
  },
  // Diğer rotalarınız
]);

export function Router() {
  return <RouterProvider router={router} />;
}
