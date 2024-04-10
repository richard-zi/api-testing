const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Dotenv konfigurieren
require('dotenv').config();

// CORS-Optionen definieren
const corsOptions = {
  origin: 'http://localhost:3000', // Erlaubt Zugriffe vom Frontend, das auf Port 3000 läuft
  optionsSuccessStatus: 200, // Einige ältere Browser (IE11, verschiedene SmartTVs) benötigen 200
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Erlaubte HTTP-Methoden
  allowedHeaders: "Content-Type,Authorization", // Erlaubte Header
  credentials: true, // Erlaubt Cookies
};

// CORS-Middleware für alle Anfragen verwenden
app.use(cors(corsOptions));

app.use(express.json());

// Zusätzliche Importe


// Neue Route für die Kommunikation mit OpenAI
app.post('/chat-with-openai', async (req, res) => {
  const { messages } = req.body; // Nimmt die Nachrichten vom Frontend entgegen

  const systemMessage = {
    role: "assistant",
    content: "Lass uns gemeinsam auf Entdeckungsreise gehen und spannende Orte erkunden!"
  };

  const apiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: [systemMessage, ...messages],
  };

  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", apiRequestBody, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
    });

    // Sendet die Antwort von OpenAI zurück an das Frontend
    res.json(response.data);
  } catch (error) {
    console.error('Fehler bei der Kommunikation mit OpenAI:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Fehler bei der Kommunikation mit OpenAI' });
  }
});


app.get('/weather', async (req, res) => {
  const { destination } = req.query;
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
    res.json(response.data);
  } catch (error) {
    console.error('Fehler beim Abrufen der Wetterdaten:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Fehler beim Abrufen der Wetterdaten' });
  }
});

app.get('/places', async (req, res) => {
  const { destination } = req.query;
  try {
    // Anfrage an Google Places API, um Orte zu erhalten
    const placesResponse = await axios.post('https://places.googleapis.com/v1/places:searchText', {
      textQuery: `Interessante Orte in ${destination}`,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.photos',
      }
    });

    const places = placesResponse.data.places || [];

    // Fotos für jeden Ort anfordern
    const placesWithPhotos = await Promise.all(places.map(async (place) => {
      const photoRequests = place.photos.map(async (photo) => {
        const photoResponse = await axios.get(`https://places.googleapis.com/v1/${photo.name}/media?key=${process.env.GOOGLE_PLACES_API_KEY}&maxWidthPx=400`);
        return photoResponse.request.res.responseUrl; // URL des Fotos
      });

      const photos = await Promise.all(photoRequests);
      return { ...place, photos };
    }));

    res.json({ places: placesWithPhotos });
  } catch (error) {
    console.error('Fehler beim Abrufen der Orte:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Fehler beim Abrufen der Orte' });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
