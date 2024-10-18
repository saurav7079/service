const mongoose = require('mongoose');

// Define the schema for storing invalid messages
const InvalidMessageSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,  // This field explains why the data is invalid
    }
}, { timestamps: true });  // Timestamps for createdAt and updatedAt fields

// Create a model for invalid messages
const InvalidMessage = mongoose.model('InvalidMessage', InvalidMessageSchema);

module.exports = InvalidMessage;
