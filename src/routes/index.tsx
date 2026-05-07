import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignupPage from '@/features/auth/pages/SignupPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import HomePage from '@/features/home/pages/HomePage';
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
      }
    ]
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};