import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Redirect to home if already authenticated
  if (user) {
    // Redirect to the page they came from, or to home if no previous location
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  // Allow access to public route if not authenticated
  return children;
};

export default PublicRoute;
