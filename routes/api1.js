const express = require('express');
const axios = require('axios');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

router.post('/sendData', authenticateToken, async (req, 
    res) => {
    const data = req.body;
    try {
        // Automatically send data to API 2
        const response = await axios.post('http://localhost:3000/api2/filterData', data, {
            headers: { Authorization: `Bearer ${req.headers['authorization']}` }
        });

        console.log(response.data)
        res.status(200).json({ message: 'Data sent to API 2'});
        // res.status(200).json({ message: 'Data sent to API 2', response: response.data });
    } catch (error) {
        console.error('Error sending data to API 2:', error);
        res.status(500).json({ message: 'Failed to send data to API 2' });
    }
});

module.exports = router;