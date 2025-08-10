import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">
          <NavLink to="/"><i className="fas fa-graduation-cap logo-icon"></i><span className="logo-text">SkillvateTech</span></NavLink>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li><NavLink to="/" className="nav-link">Home</NavLink></li>
            <li><NavLink to="/about" className="nav-link">About Us</NavLink></li>
            <li><NavLink to="/advisory-board" className="nav-link">Advisory Board</NavLink></li>
            <li><NavLink to="/admission" className="nav-link ">Admissions</NavLink></li>
            <li><NavLink to="/programs" className="nav-link">Programs</NavLink></li>
            <li><NavLink to="/resources" className="nav-link">Resources</NavLink></li>
            <li><NavLink to="/gallery" className="nav-link">Gallery</NavLink></li>
            {/* --- Added Admissions NavLink --- */}
            <li><NavLink to="/contact" className="nav-link">Contact Us</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;