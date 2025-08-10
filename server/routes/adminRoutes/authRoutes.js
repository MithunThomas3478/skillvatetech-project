// server/routes/adminRoutes/authRoutes.js

const express = require('express');
const router = express.Router();

// കൺട്രോളർ ഫംഗ്ഷനുകൾ ഇമ്പോർട്ട് ചെയ്യുന്നു
const { 
    register,         // <--- register ഇവിടെ ഇമ്പോർട്ട് ചെയ്യുക
    login, 
    forgotPassword, 
    verifyOtp, 
    resetPassword,
    logout
} = require('../../controllers/adminController/authController');

// റൂട്ടുകൾ നിർവചിച്ച് കൺട്രോളർ ഫംഗ്ഷനുകളുമായി ബന്ധിപ്പിക്കുന്നു
router.post('/register', register); // <--- /register റൂട്ട് ഇവിടെ ചേർക്കുക
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.get('/logout', logout);

module.exports = router;