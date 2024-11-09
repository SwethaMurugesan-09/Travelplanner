// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Navbar.css';
import { CgProfile } from "react-icons/cg";
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home page after logout
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className='navbar-webName'>
        <h1>Travey</h1>
      </div>
      <div className="navbar-elements">
        <div className="navbar-content"><Link to="/">Home</Link></div>
        <div className="navbar-content"><Link to="/about">About</Link></div>
        <div className="navbar-content"><Link to="/contact">Contact</Link></div>
        {isAuthenticated ? (
          <div className="navbar-content">
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navbar-content"><Link to="/login">Login</Link></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
