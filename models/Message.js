const mongoose = require('mongoose');

// Define the schema for storing messages
const MessageSchema = new mongoose.Schema({
    company: {
        type: String,
        require: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
   
},{timestamps:true});

// Create a model for the schema
const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
