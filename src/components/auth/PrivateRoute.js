import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser === null) {
    // Still loading or no user
    return <Navigate to="/login" />;
  }

  // Render children if authenticated
  return children;
};

export default PrivateRoute;
