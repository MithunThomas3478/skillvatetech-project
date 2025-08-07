// src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // ഇപ്പോൾ നമ്മൾ 'authToken' എന്ന ടോക്കൺ ഉണ്ടോ എന്നാണ് പരിശോധിക്കുന്നത്
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;