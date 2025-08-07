// src/components/admin/DashboardHeader.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const DashboardHeader = ({ toggleSidebar }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  // ഡ്രോപ്പ്ഡൗണിന് പുറത്ത് ക്ലിക്ക് ചെയ്യുമ്പോൾ അത് ക്ലോസ് ചെയ്യാനുള്ള ലോജിക്
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="dashboard-header">
      <button className="menu-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      <div className="header-actions">
        {/* ref, className എന്നിവ ഡ്രോപ്പ്ഡൗണിന് നൽകുന്നു */}
        <div className="user-profile" ref={dropdownRef}>
          <img
            src="https://i.pravatar.cc/150?img=58"
            alt="Admin Avatar"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          />
          {/* ഡ്രോപ്പ്ഡൗൺ className-ൽ active ക്ലാസ് ചേർക്കുന്നു */}
          <div className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
              <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;