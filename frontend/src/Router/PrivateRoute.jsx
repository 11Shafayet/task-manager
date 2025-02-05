import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../stores/useStore';

const PrivateRoute = ({ children }) => {
  const isLogged = useStore((state) => state.isLogged);
  const location = useLocation();

  return isLogged ? children : <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default PrivateRoute;
