// src/components/admin/Sidebar.jsx

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'; // നോട്ടിഫിക്കേഷന് വേണ്ടി axios ഇമ്പോർട്ട് ചെയ്യുന്നു
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// ആവശ്യമായ എല്ലാ ഐക്കണുകളും ഇമ്പോർട്ട് ചെയ്യുന്നു
import { 
    faGraduationCap, 
    faTachometerAlt, 
    faUserGraduate, 
    faBook, 
    faCog, 
    faChartLine, 
    faChevronRight, 
    faPhotoFilm, 
    faFileAlt,           // അപ്ലിക്കേഷനുകൾക്ക് വേണ്ടി
    faEnvelopeOpenText   // എൻക്വയറികൾക്ക് വേണ്ടി
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isCollapsed }) => {
    const [openSubmenu, setOpenSubmenu] = useState(null);
    // നോട്ടിഫിക്കേഷൻ എണ്ണങ്ങൾ സൂക്ഷിക്കാൻ
    const [unreadCounts, setUnreadCounts] = useState({ applications: 0, inquiries: 0 });

    // പുതിയ സബ്മിഷനുകൾ ഉണ്ടോ എന്ന് പരിശോധിക്കാൻ
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // API-ൽ നിന്ന് വായിക്കാത്ത സബ്മിഷനുകളുടെ എണ്ണം എടുക്കുന്നു
                const res = await axios.get('http://localhost:5000/api/forms/unread-counts');
                setUnreadCounts(res.data);
            } catch (error) {
                console.error("Failed to fetch unread counts:", error);
            }
        };

        fetchCounts(); // ആദ്യം ഒരു തവണ വിളിക്കുന്നു
        const intervalId = setInterval(fetchCounts, 30000); // തുടർന്ന് ഓരോ 30 സെക്കൻഡിലും

        // കോമ്പോണന്റ് അൺമൗണ്ട് ആകുമ്പോൾ ഇന്റർവെൽ നിർത്തുന്നു
        return () => clearInterval(intervalId); 
    }, []);


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
                    
                    {/* ----- ✅ പുതിയതായി ചേർത്ത അപ്ലിക്കേഷൻ, എൻക്വയറി ലിങ്കുകൾ ----- */}
                    <li className="nav-item">
                        <NavLink to="/admin/applications" className="nav-link">
                            <FontAwesomeIcon icon={faFileAlt} className='icon' />
                            <span className='link-text'>Applications</span>
                            {/* അപ്ലിക്കേഷൻ നോട്ടിഫിക്കേഷൻ ബാഡ്ജ് */}
                            {unreadCounts.applications > 0 && <span className="notification-badge">{unreadCounts.applications}</span>}
                            <span className="tooltip">Applications</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/inquiries" className="nav-link">
                            <FontAwesomeIcon icon={faEnvelopeOpenText} className='icon' />
                            <span className='link-text'>Inquiries</span>
                             {/* എൻക്വയറി നോട്ടിഫിക്കേഷൻ ബാഡ്ജ് */}
                            {unreadCounts.inquiries > 0 && <span className="notification-badge">{unreadCounts.inquiries}</span>}
                            <span className="tooltip">Inquiries</span>
                        </NavLink>
                    </li>
                    {/* ---------------------------------------------------- */}

                    
                    
                    <li className="nav-item">
                        <NavLink to="/admin/gallery" className="nav-link">
                            <FontAwesomeIcon icon={faPhotoFilm} className='icon' />
                            <span className='link-text'>Gallery</span>
                            <span className="tooltip">Gallery</span>
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