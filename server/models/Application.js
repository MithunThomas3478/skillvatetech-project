const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    stream: { type: String, required: true },
    message: { type: String },
    submittedAt: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
    // ✅ പുതിയതായി ചേർത്ത സ്റ്റാറ്റസ് ഫീൽഡ്
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'cancelled'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Application', ApplicationSchema);