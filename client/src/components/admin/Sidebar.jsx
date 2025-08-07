// src/components/admin/Sidebar.jsx

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faTachometerAlt, faUserGraduate, faBook, faCog, faChartLine, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isCollapsed }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleSubmenuToggle = (menuName) => {
    if (isCollapsed) return; // സൈഡ്‌ബാർ ചെറുതാണെങ്കിൽ സബ്മെനു പ്രവർത്തിക്കില്ല
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <FontAwesomeIcon icon={faGraduationCap} className="logo-icon" />
        <span className="logo-text">SkillvateTech</span>
      </div>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/admin" end className="nav-link">
              <FontAwesomeIcon icon={faTachometerAlt} className='icon' />
              <span className='link-text'>Dashboard</span>
              <span className="tooltip">Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/students" className="nav-link">
              <FontAwesomeIcon icon={faUserGraduate} className='icon' />
              <span className='link-text'>Students</span>
              <span className="tooltip">Students</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/programs" className="nav-link">
                <FontAwesomeIcon icon={faBook} className='icon' />
                <span className='link-text'>Programs</span>
                <span className="tooltip">Programs</span>
            </NavLink>
          </li>
          
          <li className={`nav-item has-submenu ${openSubmenu === 'reports' ? 'open' : ''}`}>
            <a href="#" className="nav-link" onClick={() => handleSubmenuToggle('reports')}>
              <FontAwesomeIcon icon={faChartLine} className='icon' />
              <span className='link-text'>Reports</span>
              <FontAwesomeIcon icon={faChevronRight} className='arrow-icon' />
              <span className="tooltip">Reports</span>
            </a>
            <ul className="submenu">
              <li><NavLink to="/admin/reports/admissions" className="submenu-link">Admissions Report</NavLink></li>
              <li><NavLink to="/admin/reports/placements" className="submenu-link">Placement Report</NavLink></li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/admin/settings" className="nav-link">
              <FontAwesomeIcon icon={faCog} className='icon' />
              <span className='link-text'>Settings</span>
              <span className="tooltip">Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;