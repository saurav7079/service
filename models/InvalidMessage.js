const mongoose = require('mongoose');

const invalidMessageSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
}, { timestamps: true });

const InvalidMessage = mongoose.model('InvalidMessage', invalidMessageSchema);

module.exports = InvalidMessage;
