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
    <div className="container mx-auto p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-4">Wetter in {destination}</h2>

      {weather ? (
        <div className="flex items-center gap-4">
          {/* Consider an icon for weather state */}
          <div>
            <p className="text-xl font-medium">{weather.main.temp}°C</p>
            <p className="text-gray-600">{weather.weather[0].description}</p>
          </div>
        </div>
      ) : (
        <div className="text-center">Lade Wetterdaten...</div>
      )}
    </div>
  );
}

export default Weather;