import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../admin/Sidebar"; // തിരുത്തിയത്
import DashboardHeader from "../admin/DashboardHeader"; // തിരുത്തിയത്

const AdminLayout = () => {
  // നിങ്ങളുടെ ബാക്കിയുള്ള കോഡ് ഇവിടെ...
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarActive(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarActive(!isSidebarActive);
    } else {
      setSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      setIsSidebarActive(false);
    }
  };
  
  const sidebarClass = isMobile ? (isSidebarActive ? 'active' : '') : (isSidebarCollapsed ? 'collapsed' : '');

  return (
    <div className="dashboard-container">
      <Sidebar isCollapsed={!isMobile && isSidebarCollapsed} className={sidebarClass} />
      
      <div 
        className={`mobile-overlay ${isSidebarActive ? 'active' : ''}`} 
        onClick={handleOverlayClick}
      ></div>

      <div className={`main-content-wrapper ${!isMobile && isSidebarCollapsed ? 'collapsed' : ''}`}>
        <DashboardHeader toggleSidebar={toggleSidebar} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;