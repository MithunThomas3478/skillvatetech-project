// src/pages/admin/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // <-- മാറ്റം ഇവിടെ
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // <-- മാറ്റം ഇവിടെ

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // പാസ്‌വേഡ് കാണിക്കാനുള്ള സ്റ്റേറ്റുകൾ <-- മാറ്റം ഇവിടെ
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    
    const email = location.state?.email;
    const token = location.state?.token;

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
                
                {/* New Password Field with Eye Icon */}
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                        type={isPasswordVisible ? 'text' : 'password'} // <-- മാറ്റം ഇവിടെ
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter new password"
                    />
                    <FontAwesomeIcon
                        icon={isPasswordVisible ? faEyeSlash : faEye} // <-- മാറ്റം ഇവിടെ
                        className="password-toggle-icon" // <-- മാറ്റം ഇവിടെ
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)} // <-- മാറ്റം ഇവിടെ
                    />
                </div>

                {/* Confirm Password Field with Eye Icon */}
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm New Password</label>
                    <input
                        type={isConfirmPasswordVisible ? 'text' : 'password'} // <-- മാറ്റം ഇവിടെ
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm new password"
                    />
                    <FontAwesomeIcon
                        icon={isConfirmPasswordVisible ? faEyeSlash : faEye} // <-- മാറ്റം ഇവിടെ
                        className="password-toggle-icon" // <-- മാറ്റം ഇവിടെ
                        onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} // <-- മാറ്റം ഇവിടെ
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