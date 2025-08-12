import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  // State to manage mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close the menu (used by NavLinks)
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  // Prevent body scroll when the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    // Cleanup function to remove the class if the component unmounts
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isMenuOpen]);


  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">
          <NavLink to="/" onClick={closeMenu}>
            <i className="fas fa-graduation-cap logo-icon"></i>
            <span className="logo-text">SkillvateTech</span>
          </NavLink>
        </div>

        {/* The nav-list gets a conditional 'active' class */}
        <nav className="nav">
          <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
            <li><NavLink to="/" className="nav-link" onClick={closeMenu}>Home</NavLink></li>
            <li><NavLink to="/about" className="nav-link" onClick={closeMenu}>About Us</NavLink></li>
            <li><NavLink to="/advisory-board" className="nav-link" onClick={closeMenu}>Advisory Board</NavLink></li>
            <li><NavLink to="/admission" className="nav-link" onClick={closeMenu}>Admissions</NavLink></li>
            <li><NavLink to="/programs" className="nav-link" onClick={closeMenu}>Programs</NavLink></li>
            <li><NavLink to="/resources" className="nav-link" onClick={closeMenu}>Resources</NavLink></li>
            <li><NavLink to="/gallery" className="nav-link" onClick={closeMenu}>Gallery</NavLink></li>
            <li><NavLink to="/contact" className="nav-link" onClick={closeMenu}>Contact Us</NavLink></li>
          </ul>
        </nav>

        {/* Hamburger Menu Button */}
        {/* This button's icon changes based on the 'isMenuOpen' state */}
        <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle navigation">
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>
      </div>
    </header>
  );
};

export default Header;