import React, { useState, useEffect } from 'react';
import Weather from './components/Weather';
import Places from './components/Places';

function App() {
 const [destination, setDestination] = useState('');
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
       onClick={handleFetchData} // Verändere die onClick Funktion 
       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
     >
       Wetter und Orte abrufen 
     </button>

     <Weather destination={destination} fetchWeatherTrigger={fetchWeatherTrigger} />
     <Places destination={destination} fetchPlacesTrigger={fetchPlacesTrigger} />
   </div>
    </div>
  );
}

export default App;