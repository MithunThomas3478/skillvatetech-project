const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: ['labs', 'campus', 'events'],
    },
    mediaType: {
        type: String,
        required: true,
        enum: ['image', 'video'],
    },
    mediaUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
