// src/pages/admin/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    
    // ലൊക്കേഷൻ സ്റ്റേറ്റിൽ നിന്ന് ഇമെയിലും ടോക്കണും എടുക്കുന്നു
    const email = location.state?.email;
    const token = location.state?.token;

    // ഇമെയിലോ ടോക്കണോ ഇല്ലെങ്കിൽ ലോഗിൻ പേജിലേക്ക് തിരിച്ചുവിടുന്നു
    if (!email || !token) {
        navigate('/login');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setError('');
        setMessage('');

        try {
            // API-ലേക്ക് ടോക്കണും പുതിയ പാസ്‌വേഡും മാത്രം അയക്കുന്നു
            await axios.post('http://localhost:5000/api/auth/reset-password', {
                token,
                password,
            });

            setMessage('Password has been reset successfully. Redirecting to login...');
            
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to reset password. The link may have expired.';
            setError(errorMessage);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Reset Password</h2>
                <p>Enter your new password.</p>
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter new password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm new password"
                    />
                </div>
                {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="btn-login">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;