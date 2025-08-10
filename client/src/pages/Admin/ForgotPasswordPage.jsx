// src/pages/admin/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      // ഈ API എൻഡ്പോയിന്റ് ബാക്കെൻഡിൽ തയ്യാറാക്കണം
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage('An OTP has been sent to your email address.');
      
      // OTP പേജിലേക്ക് ഇമെയിൽ സഹിതം നാവിഗേറ്റ് ചെയ്യുന്നു
      setTimeout(() => {
        navigate('/verify-otp', { state: { email } });
      }, 2000);

    } catch (err) {
      setError('Email not found or something went wrong.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p>Enter your email to receive an OTP.</p>
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
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn-login">Send OTP</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;