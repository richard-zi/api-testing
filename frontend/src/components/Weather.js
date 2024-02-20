import React, { useState, useEffect, useCallback } from 'react';

function Weather({ destination, fetchWeatherTrigger }) {
  const [weather, setWeather] = useState(null);

  const fetchWeather = useCallback(() => {
    if (destination) {
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
  }, [destination]);

  useEffect(() => {
    if (fetchWeatherTrigger) {
      fetchWeather();
    }
  }, [fetchWeatherTrigger, fetchWeather]);

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