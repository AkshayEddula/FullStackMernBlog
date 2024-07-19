import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-logo">
            <Link to='/' onClick={handleLinkClick}><h1>DEVSPOT.</h1></Link>
          </div>
          <div className="footer-links">
            <NavLink to="/" onClick={handleLinkClick}>Home</NavLink>
            <NavLink to="/posts" onClick={handleLinkClick}>Articles</NavLink>
            <NavLink to="/posts/createpost" onClick={handleLinkClick}>Be a Writer</NavLink>
            <NavLink to="/login" onClick={handleLinkClick}>Sign in</NavLink>
            <NavLink to="/signup" onClick={handleLinkClick}>Get Started</NavLink>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Akshay Eddula. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
