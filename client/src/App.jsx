// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import UserLayout from './components/layout/UserLayout.jsx';
import AdminLayout from './components/layout/AdminLayout.jsx';

// User Pages
import HomePage from './pages/user/HomePage.jsx';
import AboutPage from './pages/user/AboutPage.jsx';
import AdmissionPage from './pages/user/AdmissionPage.jsx';
import AdvisoryBoardPage from './pages/user/AdvisoryBoardPage.jsx';
import ContactPage from './pages/user/ContactPage.jsx';
import GalleryPage from './pages/user/GalleryPage.jsx';
import ProgramsPage from './pages/user/ProgramsPage.jsx';
import ResourcesPage from './pages/user/ResourcesPage.jsx';

// Admin & Auth Pages
import LoginPage from './pages/admin/LoginPage.jsx';
import DashboardPage from './pages/admin/DashboardPage.jsx';
import ForgotPasswordPage from './pages/admin/ForgotPasswordPage.jsx';
import OtpVerificationPage from './pages/admin/OtpVerificationPage.jsx';
import ResetPasswordPage from './pages/admin/ResetPasswordPage.jsx';
import ApplicationsPage from './pages/admin/ApplicationsPage.jsx'; 
import InquiriesPage from './pages/admin/InquiriesPage.jsx';

// ✅ പുതിയതായി ഗാലറി മാനേജ്മെൻ്റ് പേജ് ഇമ്പോർട്ട് ചെയ്യുന്നു
import GalleryManagementPage from './pages/admin/GalleryManagementPage.jsx';

// Auth Component
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- User Portal Routes --- */}
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

        {/* --- Admin & Auth Routes --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<OtpVerificationPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Protected Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="inquiries" element={<InquiriesPage />} />
          
          {/* ----- ✅ ഗാലറി പേജിനുള്ള റൂട്ട് ഇവിടെ ചേർത്തു ----- */}
          <Route path="gallery" element={<GalleryManagementPage />} />
          
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;