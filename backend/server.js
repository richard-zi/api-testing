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




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
