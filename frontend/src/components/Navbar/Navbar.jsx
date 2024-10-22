import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <h1>Travey</h1>
      </div>
      <div className='navbar-elements'>
        <div className='navbar-content'><Link to="/">Home</Link></div>
        <div className='navbar-content'><Link to="/about">About Us</Link></div>
        <div className='navbar-content'><Link to="/contact">Contact</Link></div>
        <div className='navbar-content'><Link to="/login">Login</Link></div>
      </div>
    </nav>
  );
};

export default Navbar;
