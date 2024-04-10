// App.js
import React, { useState, useRef } from 'react';
import Weather from './components/Weather';
import Places from './components/Places';
import Navbar from './components/Navbar/Navbar';
import Chatbot from './components/Chatbot';
import CityRating from './components/CityRating';

function App() {
  const [destination, setDestination] = useState('');
  const [fetchWeatherTrigger, setFetchWeatherTrigger] = useState(false);
  const [fetchPlacesTrigger, setFetchPlacesTrigger] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [travel, setTravel] = useState([]);
  const chatbotRef = useRef(null);

  const handleFetchData = () => {
    setFetchWeatherTrigger(true);
    setFetchPlacesTrigger(true);
    if (chatbotRef.current) {
      chatbotRef.current.clearMessages();
      chatbotRef.current.sendMessage(destination);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleFetchData();
    }
  };

  const handleInputChange = (event) => {
    const newDestination = event.target.value;
    setDestination(newDestination);
  };

  const addToBookmarks = (place) => {
    setBookmarks([...bookmarks, place]);
  };

  const toggleBookmarkModal = (index) => {
    if (index !== undefined) {
      const updatedBookmarks = [...bookmarks];
      updatedBookmarks.splice(index, 1);
      setBookmarks(updatedBookmarks);
    }
  };

  return (
    <div className="App bg-gray-100 min-h-screen">
      <Navbar
        bookmarks={bookmarks}
        toggleBookmarkModal={toggleBookmarkModal}
        travel={travel}
        setTravel={setTravel}
      />
      <div className="max-w-7xl mx-auto p-4">
        {!fetchWeatherTrigger && !fetchPlacesTrigger && (
          <div className="flex justify-center items-center h-80">
            <div className="w-full md:w-1/2 px-4 flex mb-4">
              <input
                type="text"
                value={destination}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="block w-full rounded-l-md border-0 py-2 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Reiseziel eingeben..."
              />
              <button
                onClick={handleFetchData}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-md"
              >
                <svg
                  className="w-5 h-5"
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
              </button>
            </div>
          </div>
        )}
        {(fetchWeatherTrigger || fetchPlacesTrigger) && (
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-4 mb-8">
              <div className="w-full px-4 flex mb-4">
                <input
                  type="text"
                  value={destination}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="block w-full rounded-l-md border-0 py-2 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Reiseziel eingeben..."
                />
                <button
                  onClick={handleFetchData}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-md"
                >
                  <svg
                    className="w-5 h-5"
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
                </button>
              </div>
              {fetchWeatherTrigger && (
                <Weather
                  destination={destination}
                  fetchWeatherTrigger={fetchWeatherTrigger}
                />
              )}
              {fetchWeatherTrigger && <CityRating destination={destination} />}
            </div>
            <div className="w-full md:w-1/2 px-4">
              <Chatbot
                ref={chatbotRef}
                destination={destination}
                handleFetchData={handleFetchData}
              />
            </div>
          </div>
        )}
        <div className="w-full">
          {fetchPlacesTrigger && (
            <Places
              destination={destination}
              fetchPlacesTrigger={fetchPlacesTrigger}
              addToBookmarks={addToBookmarks}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              setTravel={setTravel}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;