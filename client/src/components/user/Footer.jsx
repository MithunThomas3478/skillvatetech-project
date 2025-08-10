import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState({ message: '', error: false });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/forms/subscribe', { email });
      setResponse({ message: res.data.message, error: false });
      setEmail('');
    } catch (err) {
      setResponse({ message: err.response?.data?.message || 'Subscription failed.', error: true });
    }
    setTimeout(() => setResponse({ message: '', error: false }), 4000);
  };

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-about">
            <div className="logo"><Link to="/"><i className="fas fa-graduation-cap logo-icon"></i><span className="logo-text">SkillvateTech</span></Link></div>
            <p>Your bridge from engineering theory to industry excellence. Located in the heart of Kochi, Kerala.</p>
            <div className="footer-subscribe">
              <h4>Stay Updated</h4>
              <form className="subscribe-form" onSubmit={handleSubscribe}>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Subscribe</button>
              </form>
              {response.message && <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: response.error ? 'red' : 'var(--primary-orange)' }}>{response.message}</p>}
            </div>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {/* --- ✅ മാറ്റം വരുത്തിയ ലിങ്കുകൾ --- */}
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/advisory-board" className="footer-link">Advisory Board</Link></li>
              <li><Link to="/admission" className="footer-link">Admissions</Link></li>
              <li><Link to="/programs" className="footer-link">Programs</Link></li>
              <li><Link to="/resources" className="footer-link">Resources</Link></li>
              <li><Link to="/gallery" className="footer-link">Gallery</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Contact Info</h4>
            <ul>
              <li><a href="tel:+919876543210"><i className="fas fa-phone"></i> +91 98765 43210</a></li>
              <li><a href="mailto:info@skillvatetech.com"><i className="fas fa-envelope"></i> info@skillvatetech.com</a></li>
              <li><a href="#"><i className="fas fa-map-marker-alt"></i> InfoPark, Kochi, Kerala</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © 2025 SkillvateTech | Developed by <a href="https://www.anamitsoftwaresolution.com/" target="_blank" rel="noopener noreferrer">Anamitsoftwaresolution.com</a> | <a href="#">Privacy Policy</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;