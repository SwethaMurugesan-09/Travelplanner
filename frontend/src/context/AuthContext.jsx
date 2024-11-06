import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // New loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    setIsAuthenticated(!!token); // Set auth state based on token presence
    setIsLoadingAuth(false); // Mark loading as complete
  }, []);

  const login = (token) => {
    localStorage.setItem('auth-token', token);
    setIsAuthenticated(true);
    navigate('/home');
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoadingAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
