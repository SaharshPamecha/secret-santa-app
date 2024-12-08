import React, { useState, useEffect } from 'react';
import './Form.css';

function Participants() {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://secret-santa-app-r148.onrender.com/participants')
      .then((response) => {
        console.log(response)
        return response.json();
      })
      .then((data) => {
        setParticipants(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading participants...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <section className="participants-section">
      <h2>🎁 Registered Participants 🎅</h2>
      {participants.length === 0 ? (
        <p>No participants registered yet.</p>
      ) : (
        <ul className="participants-list">
          {participants.map((participant, index) => (
            <li key={index} className="participant-item">
              <strong>{participant.name}</strong> - {participant.email}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Participants;
