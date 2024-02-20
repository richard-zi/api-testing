import React, { useState, useEffect } from "react";
import Weather from "./components/Weather";
import Places from "./components/Places";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";

function App() {
  const [destination, setDestination] = useState("");
  const [fetchWeatherTrigger, setFetchWeatherTrigger] = useState(false); // Neuer state
  const [fetchPlacesTrigger, setFetchPlacesTrigger] = useState(false); // Neuer state

  const handleFetchData = () => {
    setFetchWeatherTrigger(true);
    setFetchPlacesTrigger(true);
  };

  // Einmal bei Änderungen auslösen, Triggers zurücksetzen
  useEffect(() => {
    if (fetchWeatherTrigger || fetchPlacesTrigger) {
      setFetchWeatherTrigger(false);
      setFetchPlacesTrigger(false);
    }
  }, [fetchWeatherTrigger, fetchPlacesTrigger]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleFetchData();
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-wrap items-center justify-center"></div>

        <div className="flex -mx-4">
          <div className="w-1/2 px-4">
            <div className="w-full px-4 flex">
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyPress={handleKeyPress}
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Reiseziel eingeben..."
              />
              <button
                onClick={handleFetchData}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Suchen
              </button>
            </div>
            <Weather
              destination={destination}
              fetchWeatherTrigger={fetchWeatherTrigger}
            />
          </div>
          <div className="w-1/2 px-4">
            <Chatbot />
          </div>
        </div>
        <Places
          destination={destination}
          fetchPlacesTrigger={fetchPlacesTrigger}
        />
      </div>
    </div>
  );
}

export default App;
