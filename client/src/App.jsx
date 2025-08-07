// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ലേഔട്ടുകൾ
import UserLayout from './components/layout/UserLayout.jsx'; // പേര് മാറ്റിയത് ശ്രദ്ധിക്കുക
import AdminLayout from './components/layout/AdminLayout.jsx';

// യൂസർ പേജുകൾ
import HomePage from './pages/user/HomePage.jsx';
import AboutPage from './pages/user/AboutPage.jsx';
import AdmissionPage from './pages/user/AdmissionPage.jsx';
import AdvisoryBoardPage from './pages/user/AdvisoryBoardPage.jsx';
import ContactPage from './pages/user/ContactPage.jsx';
import GalleryPage from './pages/user/GalleryPage.jsx';
import ProgramsPage from './pages/user/ProgramsPage.jsx';
import ResourcesPage from './pages/user/ResourcesPage.jsx';

// അഡ്മിൻ, ലോഗിൻ പേജുകൾ
import LoginPage from './pages/admin/LoginPage.jsx';
import DashboardPage from './pages/admin/DashboardPage.jsx'; // ശരിയായ പാത്ത്

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* യൂസർ പോർട്ടൽ */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="admission" element={<AdmissionPage />} />
          <Route path="advisory-board" element={<AdvisoryBoardPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="programs" element={<ProgramsPage />} />
          <Route path="resources" element={<ResourcesPage />} />
        </Route>

        {/* അഡ്മിൻ പോർട്ടൽ */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;