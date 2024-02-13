import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Events({ destination, fetchEventsTrigger }) {
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      // Führen Sie den Fetch nur aus, wenn destination gesetzt ist
      if (destination) {
        fetchEvents();
      }
    }, [fetchEventsTrigger]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/events?destination=${destination}`);
      setEvents(response.data._embedded.events);
    } catch (error) {
      console.error('Fehler beim Abrufen der Events:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="events">
      <h2>Veranstaltungen in {destination}</h2>
      <div className="event-list">
        {events.map((event) => (
          <div key={event.id} className="event">
            <h3>{event.name}</h3>
            {event.dates.start.localDate && (
              <p>Datum: {formatDate(event.dates.start.localDate)}</p>
            )}
            {event.images && event.images.length > 0 && (
              <img
                src={event.images[0].url} // Nimmt das erste Bild aus der Liste
                alt={event.name}
                style={{ width: '100%', height: 'auto' }}
              />
            )}
            <a href={event.url} target="_blank" rel="noopener noreferrer">
              Mehr erfahren
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
