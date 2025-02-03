import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const loggedInUser = await JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) {
          setUser(loggedInUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user && user.role === 'admin') {
    return children;
  }

  return <Navigate state={location.pathname} to={'/'} replace></Navigate>;
};

export default AdminRoute;
