import React, { useState, useEffect, useCallback } from "react";

function Weather({ destination, fetchWeatherTrigger }) {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = useCallback(() => {
    if (destination) {
      setIsLoading(true);
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
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Fehler beim Abrufen der Wetterdaten:", error);
          setWeather(null);
          setIsLoading(false);
        });
    }
  }, [destination]);

  useEffect(() => {
    if (fetchWeatherTrigger) {
      fetchWeather();
    }
  }, [fetchWeatherTrigger, fetchWeather]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4">Wetter in {destination}</h2>
    {isLoading ? (
      <div className="text-gray-500">Lade Wetterdaten...</div>
    ) : weather ? (
      <div className="flex items-center">
        <div className="text-6xl font-bold mr-6">{Math.round(weather.main.temp)}°C</div>
        <div>
          <div className="text-2xl font-semibold mb-1">{weather.weather[0].main}</div>
          <div className="text-gray-600">{weather.weather[0].description}</div>
        </div>
      </div>
    ) : (
      <div className="text-gray-500">Keine Wetterdaten verfügbar.</div>
    )}
  </div>
  );
}

export default Weather;