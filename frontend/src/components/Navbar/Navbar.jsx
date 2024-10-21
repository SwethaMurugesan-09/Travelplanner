import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure to link to Navbar CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <div className='navbar-elements'>
        <div><li><Link to="/">Home</Link></li></div>
        <div><li><Link to="/about">About Us</Link></li></div>
        <div><li><Link to="/contact">Contact</Link></li></div>
        <div><li><Link to="/login">Login</Link></li></div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
