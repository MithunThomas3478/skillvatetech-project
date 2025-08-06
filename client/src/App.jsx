import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';

// എല്ലാ പേജുകളും ഇപ്പോൾ ഇമ്പോർട്ട് ചെയ്യുന്നു
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AdmissionPage from './pages/AdmissionPage.jsx';
import AdvisoryBoardPage from './pages/AdvisoryBoardPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ProgramsPage from './pages/ProgramsPage.jsx';
import ResourcesPage from './pages/ResourcesPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* എല്ലാ പേജുകൾക്കുമുള്ള റൂട്ടുകൾ */}
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="admission" element={<AdmissionPage />} />
          <Route path="advisory-board" element={<AdvisoryBoardPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="programs" element={<ProgramsPage />} />
          <Route path="resources" element={<ResourcesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;