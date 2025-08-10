const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    stream: { type: String },
    query: { type: String },
    type: { type: String, required: true, enum: ['contact', 'subscribe'] },
    submittedAt: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
    // ✅ പുതിയതായി ചേർത്ത സ്റ്റാറ്റസ് ഫീൽഡ്
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'cancelled'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Inquiry', InquirySchema);