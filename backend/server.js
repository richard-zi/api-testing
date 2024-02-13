const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/weather', async (req, res) => {
  const { destination } = req.query;
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=f70f247381c3748de5f2cc2790164a40&units=metric`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Wetterdaten' });
  }
});

app.get('/attractions', async (req, res) => {
  const { destination } = req.query;
  try {
    const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=${destination}&apikey=lAFS1OGPeG4Mk5hBKTnrAJAlPkNJFAQ3`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attractions data' });
  }
});


app.get('/attraction-details/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/attractions/${id}.json?apikey=lAFS1OGPeG4Mk5hBKTnrAJAlPkNJFAQ3`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attraction details' });
  }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
