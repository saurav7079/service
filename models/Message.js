const mongoose = require('mongoose');

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

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
