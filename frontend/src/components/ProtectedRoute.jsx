// src/utils/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log("ProtectedRoutes - isAuthenticated:", isAuthenticated); // Debugging line

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
