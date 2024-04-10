import React, { useState } from 'react';

function CityRating({ destination }) {
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(3.5); // Beispielwert für die Durchschnittsbewertung

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setAverageRating((prevAverageRating) => {
      // Berechne die neue Durchschnittsbewertung basierend auf der vorherigen Bewertung und der neuen Bewertung
      const newAverageRating = (prevAverageRating + newRating) / 2;
      return newAverageRating;
    });
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-7 py-3">
        <h2 className="text-xl font-semibold mb-2">Bewertung für {destination}</h2>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleRatingChange(star)}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <div className="text-gray-600 ml-4">
            <span className="font-bold">{averageRating.toFixed(1)}</span> / 5
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityRating;