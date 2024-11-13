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

  const login = async (token) => {
    localStorage.setItem('auth-token', token); 
    setIsAuthenticated(true);
    
    // Fetch and store userId after setting the token
    const userId = await fetchUserId(token);
    if (userId) {
      localStorage.setItem('userId', userId);
    }
    
    navigate('/'); 
  };

  const fetchUserId = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data.success ? data.user._id : null; // Assuming the userId is in data.user._id
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token'); 
    localStorage.removeItem('userId'); // Clear userId on logout
    setIsAuthenticated(false);
    navigate('/'); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoadingAuth, login, logout }}>
      {isLoadingAuth ? <p>Loading...</p> : children} {/* Display loading indicator */}
    </AuthContext.Provider>
  );
};
