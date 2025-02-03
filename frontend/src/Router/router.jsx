import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PublicLayout from '../layouts/PublicLayout';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

// Import all pages from pages directory
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Patient from '../pages/Patient';
import Staffs from '../pages/Staffs';
import Delivery from '../pages/Delivery';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/patients-details',
        element: (
          <PrivateRoute>
            <Patient />
          </PrivateRoute>
        ),
      },
      {
        path: '/staffs-details',
        element: (
          <PrivateRoute>
            <Staffs />
          </PrivateRoute>
        ),
      },
      {
        path: '/delivery-details',
        element: (
          <PrivateRoute>
            <Delivery />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: '/sign-in',
        element: (
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        ),
      },
    ],
  },
]);

export default router;
