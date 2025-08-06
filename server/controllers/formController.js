const Application = require('../models/Application');
const Inquiry = require('../models/Inquiry');

exports.submitApplication = async (req, res) => {
    try {
        const newApplication = new Application(req.body);
        await newApplication.save();
        res.status(201).json({ message: 'Application submitted successfully! We will get in touch with you shortly.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
    }
};

exports.submitContactInquiry = async (req, res) => {
    try {
        const newInquiry = new Inquiry({ ...req.body, type: 'contact' });
        await newInquiry.save();
        res.status(201).json({ message: 'Your inquiry has been sent! Our team will respond soon.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
    }
};

exports.submitSubscription = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }
        const existingSubscriber = await Inquiry.findOne({ email, type: 'subscribe' });
        if (existingSubscriber) {
            return res.status(400).json({ message: 'This email is already subscribed.' });
        }
        const newSubscriber = new Inquiry({ email, type: 'subscribe' });
        await newSubscriber.save();
        res.status(201).json({ message: 'Thank you for subscribing!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
    }
};