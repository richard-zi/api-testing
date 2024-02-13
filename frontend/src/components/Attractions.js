import React, { useState, useEffect } from 'react';

function Attractions({ destination }) {
  const [attractionsWithDetails, setAttractionsWithDetails] = useState([]);

  useEffect(() => {
    if (destination) {
      fetch(`http://localhost:3001/attractions?destination=${encodeURIComponent(destination)}`)
        .then((response) => response.json())
        .then(async (data) => {
          if (data._embedded) {
            const attractions = data._embedded.attractions;

            const attractionsDetailsPromises = attractions.map((attraction) =>
              fetch(`http://localhost:3001/attraction-details/${attraction.id}`)
                .then((response) => response.json())
                .then((details) => {
                  // Nehmen Sie das erste Bild, falls vorhanden
                  const firstImage = details.images?.length > 0 ? [details.images[0]] : [];
                  
                  return {
                    ...details,
                    images: firstImage
                  };
                })
                .catch((error) => {
                  console.error('Error fetching attraction details:', error);
                  return { images: [] }; // Keine Bilder vorhanden
                })
            );

            const attractionsDetails = await Promise.all(attractionsDetailsPromises);

            const combinedAttractions = attractions.map((attraction, index) => ({
              ...attraction,
              details: attractionsDetails[index] || {}
            }));

            setAttractionsWithDetails(combinedAttractions);
          } else {
            setAttractionsWithDetails([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching attractions:', error);
          setAttractionsWithDetails([]);
        });
    }
  }, [destination]);

  if (!attractionsWithDetails.length) return <div>Loading attractions information...</div>;

  return (
    <div className="attractions-info">
      <h2>Attractions in {destination}</h2>
      {attractionsWithDetails.map((attraction, index) => (
        <div key={attraction.id || index}>
          <h3>{attraction.name}</h3>
          <div className="attraction-details">
            <p>{attraction.details.description}</p>
            <div className="attraction-images">
              {attraction.details.images?.map((image, imageIndex) => (
                // Es wird nur das erste Bild für jede Attraktion angezeigt
                imageIndex === 0 && <img key={imageIndex} src={image.url} alt={attraction.name} style={{ maxWidth: '100px', margin: '10px' }} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Attractions;
