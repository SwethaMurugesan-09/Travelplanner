import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import { CgProfile } from "react-icons/cg";


const Navbar = ({ isAuthenticated, handleLogout }) => {
  return (
    <nav className="navbar">
      <div>
        <h1>Travey</h1>
      </div>
      <div className="navbar-elements">
        <div className="navbar-content"><Link to="/">Home</Link></div>
        <div className="navbar-content"><Link to="/currencyConverter">Currency Converter</Link></div>
        <div className="navbar-content"><Link to="/contact">Contact</Link></div>
        {isAuthenticated ? (
          <div className="navbar-content">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navbar-content"><Link to="/login"><CgProfile /></Link></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
