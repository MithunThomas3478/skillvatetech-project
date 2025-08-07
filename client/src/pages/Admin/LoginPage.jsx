// src/pages/admin/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('admin@skillvate.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      // സെർവറിൽ നിന്ന് കിട്ടുന്ന ടോക്കൺ localStorage-ൽ സേവ് ചെയ്യുന്നു
      localStorage.setItem('authToken', res.data.token);
      window.location.href = '/admin'; // ലോഗിൻ ശേഷം അഡ്മിൻ ഡാഷ്‌ബോർഡിലേക്ക് പോകുന്നു
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
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        <button type="submit" className="btn-login">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;