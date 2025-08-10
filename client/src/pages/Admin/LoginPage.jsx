// src/pages/admin/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Link ഇമ്പോർട്ട് ചെയ്യുക


const LoginPage = () => {
  const [email, setEmail] = useState('admin@skillvate.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('authToken', res.data.token);
      window.location.href = '/admin';
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <p>Welcome back! Please log in to continue.</p>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group password-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </span>
        </div>
        
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-login">Login</button>
        
        <div className="forgot-password-link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

      </form>
    </div>
  );
};

export default LoginPage;