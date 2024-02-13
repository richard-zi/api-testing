import React, { useState, useEffect } from 'react';

function Weather({ destination, fetchWeatherTrigger }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = () => {
      if (destination) {
        // Hinweis: Passen Sie die URL ggf. an die URL Ihres Servers an.
        fetch(`http://localhost:3001/weather?destination=${encodeURIComponent(destination)}`)
          .then((response) => response.json())
          .then((data) => {
            if (data && data.main && data.weather) {
              setWeather(data);
            } else {
              setWeather(null);
            }
          })
          .catch(error => {
            console.error("Fehler beim Abrufen der Wetterdaten:", error);
            setWeather(null);
          });
      }
    };

    if (fetchWeatherTrigger) {
        fetchWeather();
      }
}, [fetchWeatherTrigger]); 

  if (!weather) return <div>Lade Wetterdaten...</div>;

  return (
    <div className="weather-info">
      <h2>Wetter in {destination}</h2>
      {weather && (
        <>
          <p>Temperatur: {weather.main.temp}°C</p>
          <p>Zustand: {weather.weather[0].description}</p>
        </>
      )}
    </div>
  );
}

export default Weather;
