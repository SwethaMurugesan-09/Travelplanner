import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import { CgProfile } from "react-icons/cg";
import { useAuth } from '../../context/AuthContext'; // Corrected path to AuthContext

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Access isAuthenticated and logout from AuthContext
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  // Listen to scroll events
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
      <div>
        <h1>Travey</h1>
      </div>
      <div className="navbar-elements">
        <div className="navbar-content"><Link to="/home">Home</Link></div>
        <div className="navbar-content"><Link to="/about">About</Link></div>
        <div className="navbar-content"><Link to="/contact">Contact</Link></div>
        {isAuthenticated ? (
          <div className="navbar-content">
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="navbar-content"><Link to="/">Login</Link></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
