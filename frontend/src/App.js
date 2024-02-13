import React, { useState } from 'react';
import Weather from './components/Weather';
import Events from './components/Events';

function App() {
  const [destination, setDestination] = useState('');
  const [fetchTriggerCounter, setFetchTriggerCounter] = useState(0);
  
  const handleFetchWeather = () => {
    setFetchTriggerCounter(prevCounter => prevCounter + 1);
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Wetter abrufen
        </button>
        <Weather destination={destination} fetchWeatherTrigger={fetchTriggerCounter} />
        <Events destination={destination} fetchEventsTrigger={fetchTriggerCounter} />
      </div>
    </div>
  );
}

export default App;