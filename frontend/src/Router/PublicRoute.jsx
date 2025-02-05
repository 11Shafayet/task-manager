import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../stores/useStore';

const PublicRoute = ({ children }) => {
  const isLogged = useStore((state) => state.isLogged);

  return !isLogged ? children : <Navigate to="/" />;
};

export default PublicRoute;
