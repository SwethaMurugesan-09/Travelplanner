import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsAuthenticated(true); 
    }
    setIsLoadingAuth(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('auth-token', token); 
    setIsAuthenticated(true);
    navigate('/'); 
  };

  const logout = () => {
    localStorage.removeItem('auth-token'); 
    setIsAuthenticated(false);
    navigate('/'); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoadingAuth, login, logout }}>
      {isLoadingAuth ? <p>Loading...</p> : children} {/* Display loading indicator */}
    </AuthContext.Provider>
  );
};
