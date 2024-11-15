import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [email, setEmail] = useState(''); // Initialize email
  const [userId, setUserId] = useState(''); // Initialize userId
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current Email:", email);
  }, [email]);
  
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserProfile(token);
    }
    setIsLoadingAuth(false);
  }, []);

  const login = async (token) => {
    localStorage.setItem('auth-token', token);
    setIsAuthenticated(true);

    const userProfile = await fetchUserProfile(token);
    if (userProfile) {
      setEmail(userProfile.email);
      setUserId(userProfile.id);
    }

    navigate('/');
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/signup/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        setEmail(data.user.email);
        setUserId(data.user.id);
        return data.user;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setEmail('');
    setUserId('');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoadingAuth, email, userId, login, logout }}>
      {isLoadingAuth ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};
