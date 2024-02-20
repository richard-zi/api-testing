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
    <div>
      <h2>Events und Locations in {destination}</h2>
      <ul>
        {places.map((place, index) => (
          <li key={index}>{place.displayName.text} - {place.formattedAddress}</li> 
        ))}
      </ul>
    </div>
  );
};

export default Places;