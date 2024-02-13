import React, { useState, useEffect } from 'react';

function Attractions({ destination }) {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    if (destination) {
      // Ersetzen Sie YOUR_ATTRACTIONS_API_KEY mit Ihrem tatsächlichen API-Schlüssel und wählen Sie die entsprechende API-Endpunkt-URL
      fetch(`URL_ZUR_ATTRAKTIONEN_API?q=${destination}&apikey=YOUR_ATTRACTIONS_API_KEY`)
        .then((response) => response.json())
        .then((data) => {
          setAttractions(data.results);
        });
    }
  }, [destination]);

  if (!attractions.length) return <div>Lade Informationen zu Sehenswürdigkeiten...</div>;

  return (
    <div className="attractions-info">
      <h2>Sehenswürdigkeiten in {destination}</h2>
      <ul>
        {attractions.map((attraction, index) => (
          <li key={index}>{attraction.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Attractions;
