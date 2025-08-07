// src/components/layout/UserLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';

// ✅ Header, Footer എന്നിവയുടെ ശരിയായ പുതിയ പാത്തുകൾ ഇവിടെ നൽകുന്നു
import Header from '../user/Header.jsx';
import Footer from '../user/Footer.jsx';

const UserLayout = () => {
  return (
    <>
      <Header />
      <main>
        {/* ഇവിടെയാണ് ഓരോ യൂസർ പേജും വരുന്നത് */}
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;