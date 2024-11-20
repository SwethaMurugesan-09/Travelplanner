import React, { useState, useEffect } from 'react';
import './Footer.css';
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import img from '../travel_assets/footer.jpg'
const Footer = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100); // Adjust the scroll position as needed
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`footer ${scrolled ? 'scrolled' : ''}`}>
      <div className="footer-content">
        <h2>Travey</h2>
        <p>Travey is the flagship leisure travel brand. Known for its range of customized travel offerings with quality services, we maintain the highest standards of reliability and safety, which our clients value and cherish.</p>
      </div>

      <div className="footer-service">
        <h2>Our Services</h2>
        <div className='service'>Explore</div>
        <div className='service'>Weather Prediction</div>
        <div className='service'>Currency Converter</div>
        <div className='service'>Privacy</div>
      </div>

      <div className="footer-contact">
        <h2>Contact</h2>
        <p><span>Phone:</span> 6374386020</p>
        <p><span>Email:</span> swetham.22cse@kongu.edu</p>

        <div className="footer-contact-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/in/swetha--murugesan/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
