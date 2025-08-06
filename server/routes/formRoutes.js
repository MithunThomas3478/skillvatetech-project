const express = require('express');
const router = express.Router();
const { submitApplication, submitContactInquiry, submitSubscription } = require('../controllers/formController');

router.post('/application', submitApplication);
router.post('/contact', submitContactInquiry);
router.post('/subscribe', submitSubscription);

module.exports = router;