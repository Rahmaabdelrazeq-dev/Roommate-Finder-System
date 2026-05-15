import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignupPage from '@/features/auth/pages/SignupPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import HomePage from '@/features/home/pages/HomePage';
import SearchPage from '@/features/home/pages/SearchPage';
import RoomDetailsPage from '@/features/home/pages/RoomDetailsPage';
import FavoritesPage from '@/features/home/pages/FavoritesPage';
import Layout from '@/shared/components/Layout';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'rooms/:id',
        element: <RoomDetailsPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      }
    ]
  }
]);


export const AppRouter = () => {
  return <RouterProvider router={router} />;
};