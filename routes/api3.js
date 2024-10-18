const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); 

router.post('/receiveData', async (req, res) => {
    const data = req.body;

    // Log the received data for debugging
    // console.log('Valid data received at API 3:', data);

    try {
        // Create a new data document using the data received
        const newMessage = new Message({
            company: data.company,
            location: data.location,
            message: data.message
        });

        await newMessage.save();

        res.status(200).json({ message: 'Valid data processed and saved to database' });
    } catch (error) {
        // Log any errors that occur during the save process
        // console.error('Error saving valid data to database:', error);

        res.status(500).json({ message: 'Failed to save valid data to database' });
    }
});

module.exports = router;
