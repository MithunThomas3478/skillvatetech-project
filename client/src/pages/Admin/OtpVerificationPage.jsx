// src/pages/admin/OtpVerificationPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // আগের পেজ থেকে ইমেল পান

  if (!email) {
    // যদি ইমেল না থাকে, তবে আগের পেজে ফেরত পাঠান
    navigate('/forgot-password');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // এই API এন্ডপয়েন্ট ব্যাকএন্ডে তৈরি করতে হবে
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      
      // সফল হলে, রিসেট টোকেন সহ রিসেট পাসওয়ার্ড পেজে যান
      const resetToken = res.data.token;
      navigate('/reset-password', { state: { email, token: resetToken } });

    } catch (err) {
      setError('Invalid or expired OTP. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Verify OTP</h2>
        <p>An OTP has been sent to <strong>{email}</strong>. Please enter it below.</p>
        <div className="form-group">
          <label htmlFor="otp">OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn-login">Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpVerificationPage;