// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth-token'); // Check for the token in localStorage

  return isAuthenticated ? children : <Navigate to="/" replace />; // Redirect to login if not authenticated
};

export default ProtectedRoute;
