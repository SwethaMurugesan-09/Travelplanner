import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { CgProfile } from "react-icons/cg";
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log('Dropdown open state:', !isDropdownOpen); 
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
          <div className="navbar-profile">
            <button onClick={toggleDropdown} className="profile-icon">
              <CgProfile size={24} />
            </button>
            {isDropdownOpen && (
  <div className="dropdown-menu" style={{ display: 'block', backgroundColor: 'white' }}>
    <Link to="/profile" className="dropdown-item">Profile</Link>
    <button onClick={handleLogout} className="dropdown-item">Logout</button>
  </div>
)}

          </div>
        ) : (
          <div className="navbar-content"><Link to="/login">Login</Link></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
