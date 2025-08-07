// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './assets/css/User.css';
import './assets/css/Admin.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);