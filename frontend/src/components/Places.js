import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Places = ({ destination, fetchPlacesTrigger }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (destination) {
      fetchPlaces();
    }
  }, [fetchPlacesTrigger]);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/places?destination=${encodeURIComponent(destination)}`);
      setPlaces(response.data.places);
    } catch (error) {
      console.error('Fehler beim Abrufen der Orte:', error);
    }
  };

  return (
    <div className="container mx-auto p-6"> 
      <h2 className="text-2xl font-semibold mb-4">Events und Locations in {destination}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Responsive Grid */}
        {places.map((place, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-5"> {/* Card Styling */}
            <h3 className="text-xl font-medium mb-2">{place.displayName.text}</h3> 
            <p className="text-gray-600 mb-3">{place.formattedAddress}</p>

            {place.photos && place.photos.length > 0 ? (
              <img
                src={place.photos[0]}
                alt={`Foto von ${place.displayName.text}`}
                className="w-full h-64 object-cover rounded-t-lg mb-3"  
              />
            ) : (
              <div className="bg-gray-200 h-64 rounded-t-lg mb-3 text-gray-500 flex items-center justify-center">
                Kein Foto verfügbar
              </div> 
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Places;
