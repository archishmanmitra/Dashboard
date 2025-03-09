// ProtectedRoute.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const response = await fetch('http://localhost:3000/api/protected', {
        method: "GET",
        credentials:"include",
         // Include cookies
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

<<<<<<< HEAD
  return isAuthenticated ? children : <Navigate to="/login"replace/>;
=======
  return isAuthenticated ? children : <Navigate to="/login" replace />;
>>>>>>> 3e42bd021f3317fdab07b6d829b448e9905eae5e
};

export default ProtectedRoute;