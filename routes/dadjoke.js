require('dotenv').config();
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://dad-jokes.p.rapidapi.com/random/joke', {
      headers: {
        'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching dad joke:', error);
    res.status(500).json({ message: 'Failed to fetch dad joke', error: error.message });
  }
});

module.exports = router;