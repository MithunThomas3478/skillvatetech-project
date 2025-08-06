// server/models/Inquiry.js
const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
    name: { type: String }, // Optional for subscribe
    email: { type: String, required: true },
    phone: { type: String }, // Optional
    stream: { type: String }, // Optional
    query: { type: String }, // Optional for subscribe
    type: { type: String, required: true, enum: ['contact', 'subscribe'] },
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', InquirySchema);