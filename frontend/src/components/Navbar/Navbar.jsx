import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import { CgProfile } from "react-icons/cg";

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };

  // Close dropdown when clicked outside (optional improvement)
  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div>
        <h1>Travey</h1>
      </div>
      <div className="navbar-elements">
        <div className="navbar-content"><Link to="/">Home</Link></div>
        <div className="navbar-content"><Link to="/about">About</Link></div>
        <div className="navbar-content"><Link to="/contact">Contact</Link></div>

        <div className="navbar-content profile-container">
          <CgProfile onClick={toggleDropdown} className="profile-icon" />
          
          {showDropdown && (
            <div className="profile-dropdown">
              {isAuthenticated ? (
                <button onClick={() => { handleLogout(); closeDropdown(); }} className="dropdown-item">Logout</button>
              ) : (
                <Link to="/login" onClick={closeDropdown} className="dropdown-item">Login</Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
