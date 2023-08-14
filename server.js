require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const dadJokeRouter = require('./routes/dadjoke');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs'); // Use EJS as the view engine
app.set('views', path.join(__dirname, 'views'));

// Use dad joke route handler
app.use('/api/dadjoke', dadJokeRouter);

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://dad-jokes.p.rapidapi.com/random/joke', {
      headers: {
        'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      }
    });

    const jokeData = {
      setup: response.data.body[0].setup,
      punchline: response.data.body[0].punchline,
    };

    // Render the index.ejs view with the joke data
    res.render('index', jokeData);
  } catch (error) {
    console.error('Error fetching dad joke:', error);
    res.status(500).json({ message: 'Failed to fetch dad joke', error: error.message });
  }
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise rejection:', err);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
