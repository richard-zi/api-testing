import React, { useState, useEffect, useCallback } from "react";

function Weather({ destination, fetchWeatherTrigger }) {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Zustand für das Laden hinzugefügt

  const fetchWeather = useCallback(() => {
    if (destination) {
      setIsLoading(true); // Laden beginnt
      fetch(
        `http://localhost:3001/weather?destination=${encodeURIComponent(
          destination
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.main && data.weather) {
            setWeather(data);
          } else {
            setWeather(null);
          }
          setIsLoading(false); // Laden beendet
        })
        .catch((error) => {
          console.error("Fehler beim Abrufen der Wetterdaten:", error);
          setWeather(null);
          setIsLoading(false); // Laden beendet, auch im Fehlerfall
        });
    }
  }, [destination]);

  useEffect(() => {
    if (fetchWeatherTrigger) {
      fetchWeather();
    }
  }, [fetchWeatherTrigger, fetchWeather]);

  return (
    <div className="container mx-auto p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-4">Wetter in {destination}</h2>

      {/* Zustand für das Laden und die Datenanzeige */}
      {isLoading ? (
        <div className="text-center">Lade Wetterdaten...</div>
      ) : weather ? (
        <div className="flex items-center gap-4">
          <div>
            <p className="text-xl font-medium">{weather.main.temp}°C</p>
            <p className="text-gray-600">{weather.weather[0].description}</p>
          </div>
        </div>
      ) : (
        <div className="text-center">Keine Wetterdaten verfügbar.</div>
      )}
    </div>
  );
}

export default Weather;
