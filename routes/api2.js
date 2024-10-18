const express = require('express');
const axios = require('axios');
const router = express.Router();
const Message = require('../models/Message');  // Model for valid messages
const InvalidMessage = require('../models/InvalidMessage');  // Model for invalid messages

const retryDelay = 60000; // 1 minute
const maxRetries = 10;

router.post('/filterData', async (req, res) => {
    const data = req.body;
    let retries = 0;

    // Check if data is valid based on some criteria
    if (data.company !== "apple") {
        // Data is invalid, save it in the InvalidMessage collection
        try {
            const invalidMessage = new InvalidMessage({
                company: data.company,
                location: data.location,
                message: data.message,
                reason: 'Validation'
            });
            await invalidMessage.save();

            return res.status(400).json({ message: 'Data is invalid and saved to the invalid collection.' });
        } catch (error) {
            console.error('Error saving invalid data to database:', error);
            return res.status(500).json({ message: 'Failed to save invalid data to database.' });
        }
    }

    // Function to send valid data to API 3
    const sendDataToApi3 = async () => {
        try {
            // Send valid data to API 3
            const response = await axios.post('http://localhost:3000/api3/receiveData', data);
            console.log('Data sent to API 3 successfully:', response.data);
            res.status(200).json({ message: 'Valid data sent to API 3' });
        } catch (error) {
            console.error('Error sending data to API 3:', error);
            retries++;

            if (retries < maxRetries) {
                console.log(`Retry ${retries}/${maxRetries} in ${retryDelay / 1000} seconds...`);
                setTimeout(sendDataToApi3, retryDelay);
            } else {
                res.status(500).json({ message: 'Failed to send valid data to API 3 after retries' });
            }
        }
    };

    // Send valid data to API 3
    sendDataToApi3();
});

module.exports = router;
