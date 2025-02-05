import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PublicLayout from '../layouts/PublicLayout';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

// Import all pages from pages directory
import SignIn from '../pages/SignIn';
import Boards from '../pages/Boards';
import Members from '../pages/Members';
import Timeline from '../pages/Timeline';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/boards',
        element: (
          <PrivateRoute>
            <Boards />
          </PrivateRoute>
        ),
      },
      {
        path: '/members',
        element: (
          <PrivateRoute>
            <Members />
          </PrivateRoute>
        ),
      },
      {
        path: '/timeline',
        element: (
          <PrivateRoute>
            <Timeline />
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
