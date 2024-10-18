const express = require('express');
const router = express.Router();
const Message = require('../models/Message');  // Import the updated Message model

router.post('/receiveData', async (req, res) => {
    const data = req.body;

    // Log the received data for debugging
    console.log('Valid data received at API 3:', data);

    try {
        // Create a new message document using the data received
        const newMessage = new Message({
            company: data.company,     // Store the company name
            location: data.location,   // Store the location
            message: data.message      // Store the actual message
        });

        // Save the new message to MongoDB
        await newMessage.save();

        // Send a success response
        res.status(200).json({ message: 'Valid data processed and saved to database' });
    } catch (error) {
        // Log any errors that occur during the save process
        console.error('Error saving valid data to database:', error);

        // Send a failure response
        res.status(500).json({ message: 'Failed to save valid data to database' });
    }
});

module.exports = router;
