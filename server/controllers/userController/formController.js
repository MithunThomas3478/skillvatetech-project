const Application = require('../../models/Application');
const Inquiry = require('../../models/Inquiry');

// ===============================================
// === PUBLIC-FACING FORM SUBMISSION HANDLERS ===
// ===============================================

// Handles new admission applications from the website
exports.submitApplication = async (req, res) => {
    try {
        const newApplication = new Application(req.body);
        await newApplication.save();
        res.status(201).json({ message: 'Application submitted successfully! We will get in touch with you shortly.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
    }
};

// Handles new contact inquiries from the website
exports.submitContactInquiry = async (req, res) => {
    try {
        // Sets the type to 'contact' before saving
        const newInquiry = new Inquiry({ ...req.body, type: 'contact' });
        await newInquiry.save();
        res.status(201).json({ message: 'Your inquiry has been sent! Our team will respond soon.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
    }
};

// Handles new email subscriptions from the footer
exports.submitSubscription = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }
        // Checks if the email is already subscribed
        const existingSubscriber = await Inquiry.findOne({ email, type: 'subscribe' });
        if (existingSubscriber) {
            return res.status(400).json({ message: 'This email is already subscribed.' });
        }
        // Sets the type to 'subscribe' before saving
        const newSubscriber = new Inquiry({ email, type: 'subscribe' });
        await newSubscriber.save();
        res.status(201).json({ message: 'Thank you for subscribing!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
    }
};


// ===============================================
// === ADMIN PANEL DATA FETCHING & UPDATES ===
// ===============================================

// Fetches all applications for the admin panel
exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find().sort({ submittedAt: -1 });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Fetches all contact inquiries for the admin panel
exports.getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find({ type: 'contact' }).sort({ submittedAt: -1 });
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Gets the count of unread applications and inquiries for sidebar notifications
exports.getUnreadCounts = async (req, res) => {
    try {
        const applicationCount = await Application.countDocuments({ isRead: false });
        const inquiryCount = await Inquiry.countDocuments({ type: 'contact', isRead: false });
        res.status(200).json({ applications: applicationCount, inquiries: inquiryCount });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Marks a specific application as read
exports.markApplicationAsRead = async (req, res) => {
    try {
        await Application.findByIdAndUpdate(req.params.id, { isRead: true });
        res.status(200).json({ message: 'Application marked as read.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Marks a specific inquiry as read
exports.markInquiryAsRead = async (req, res) => {
    try {
        await Inquiry.findByIdAndUpdate(req.params.id, { isRead: true });
        res.status(200).json({ message: 'Inquiry marked as read.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Updates the status of an application or inquiry
exports.updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status, type } = req.body; // type can be 'application' or 'inquiry'

    const allowedStatuses = ['pending', 'in-progress', 'completed', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value.' });
    }

    try {
        let updatedDoc;
        if (type === 'application') {
            updatedDoc = await Application.findByIdAndUpdate(id, { status }, { new: true });
        } else if (type === 'inquiry') {
            updatedDoc = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
        } else {
            return res.status(400).json({ message: 'Invalid submission type.' });
        }

        if (!updatedDoc) {
            return res.status(404).json({ message: 'Document not found.' });
        }

        res.status(200).json(updatedDoc);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};