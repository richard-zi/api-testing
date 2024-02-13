import React, { useState } from 'react';
import Weather from './components/Weather';
/* import Attractions from './components/Attractions.js'; */

function App() {
  const [destination, setDestination] = useState('');
  const [fetchWeatherTrigger, setFetchWeatherTrigger] = useState(false);

  const handleFetchWeather = () => {
    setFetchWeatherTrigger(!fetchWeatherTrigger);
  };

  return (
    <div className="App">
      <div className="max-w-md mx-auto p-4">
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="input input-bordered w-full mb-4"
          placeholder="Reiseziel eingeben..."
        />
        <button
          onClick={handleFetchWeather}
          className="btn btn-primary mb-4"
        >
          Wetter abrufen
        </button>
        <Weather destination={destination} fetchWeatherTrigger={fetchWeatherTrigger} />
        {/* <Attractions destination={destination} /> */}
      </div>
    </div>
  );
}

export default App;