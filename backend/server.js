const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/weather', async (req, res) => {
  const { destination } = req.query;
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=XXXXX&units=metric`);
    res.json(response.data);
  } catch (error) {
    console.error('Fehler beim Abrufen der Wetterdaten:', error.response ? error.response.data : error.message); // Logik hinzugefügt, um Fehler in der Konsole zu sehen
    res.status(500).json({ message: 'Fehler beim Abrufen der Wetterdaten' });
  }
});

app.get('/places', async (req, res) => {
  const { destination } = req.query;
  try {
    const response = await axios.post('https://places.googleapis.com/v1/places:searchText', {
      textQuery: `Interessante Orte in ${destination}`,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': 'XXXX',
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress', // Correct way to specify fields
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Fehler beim Abrufen der Orte:', error.response ? error.response.data : error.message); // Logik hinzugefügt, um Fehler in der Konsole zu sehen
    res.status(500).json({ message: 'Fehler beim Abrufen der Orte' });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
