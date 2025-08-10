const express = require('express');
const router = express.Router();
const { 
    submitApplication, 
    submitContactInquiry, 
    submitSubscription,
    getApplications,
    getInquiries,
    getUnreadCounts,
    markApplicationAsRead,
    markInquiryAsRead,
    updateStatus
} = require('../../controllers/userController/formController');

// =============================
// === Public Submission Routes ===
// =============================
// These routes are for users on the public website to submit forms.

// Route for submitting the admission application form
router.post('/application', submitApplication);

// Route for submitting the contact/inquiry form
router.post('/contact', submitContactInquiry);

// Route for submitting the newsletter subscription form
router.post('/subscribe', submitSubscription);


// =============================
// === Admin Panel Data Routes ===
// =============================
// These routes are for the admin panel to fetch and update data.
// In a production app, these should be protected with admin authentication middleware.

// GET routes to fetch data for admin tables
router.get('/applications', getApplications);
router.get('/inquiries', getInquiries);
router.get('/unread-counts', getUnreadCounts);

// PATCH routes to update the status of submissions
router.patch('/applications/:id/read', markApplicationAsRead);
router.patch('/inquiries/:id/read', markInquiryAsRead);
router.patch('/status/:id', updateStatus);


module.exports = router;