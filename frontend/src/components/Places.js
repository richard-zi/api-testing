import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';

const Places = ({ destination, fetchPlacesTrigger, addToBookmarks, bookmarks, setBookmarks, setTravel }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (destination) {
      fetchPlaces();
    }
  }, [fetchPlacesTrigger, destination]);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/places?destination=${encodeURIComponent(destination)}`);
      setPlaces(response.data.places);
    } catch (error) {
      console.error('Fehler beim Abrufen der Orte:', error);
    }
  };

  const isBookmarked = useCallback(
    (place) => bookmarks.some((bookmark) => bookmark.displayName.text === place.displayName.text),
    [bookmarks]
  );

  const handleBookmarkClick = useCallback(
    (place) => {
      if (isBookmarked(place)) {
        setBookmarks(bookmarks.filter((bookmark) => bookmark.displayName.text !== place.displayName.text));
      } else {
        setBookmarks([...bookmarks, place]);
      }
    },
    [isBookmarked, bookmarks, setBookmarks]
  );

  const placesWithBookmarkStatus = useMemo(
    () =>
      places.map((place) => ({
        ...place,
        isBookmarked: isBookmarked(place),
      })),
    [places, isBookmarked]
  );

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6">Events und Locations in {destination}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placesWithBookmarkStatus.map((place, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {place.photos && place.photos.length > 0 ? (
              <img src={place.photos[0]} alt={place.displayName.text} className="w-full h-64 object-cover" />
            ) : (
              <div className="w-full h-64 bg-gray-100 text-gray-500 flex items-center justify-center">
                Kein Foto verfügbar
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{place.displayName.text}</h3>
              <p className="text-gray-600">{place.formattedAddress}</p>
              {place.isBookmarked ? (
                <div className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded">Gemerkt</div>
              ) : (
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleBookmarkClick(place)}
                >
                  Merken
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Places;