import React, { useState, useEffect } from 'react';
import Weather from './components/Weather';
import Places from './components/Places';
import Navbar from './components/Navbar';

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


 const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    handleFetchData();
  }
};

return (
  <div className="App">
    <Navbar />
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center"> {/* Wrap input and button in a flex container */}
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-2 flex items-center" // Added ml-2 for margin
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          Suchen 
        </button>
      </div>

      <Weather destination={destination} fetchWeatherTrigger={fetchWeatherTrigger} />
      
    </div>
    <Places destination={destination} fetchPlacesTrigger={fetchPlacesTrigger} />
  </div>   
);
}

export default App;