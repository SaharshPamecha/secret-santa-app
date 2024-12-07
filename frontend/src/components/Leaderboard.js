import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const Leaderboard = () => {
  const [participants, setParticipants] = useState([]);
  const [totalParticipants, setTotalParticipants] = useState(0);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const data = await apiService.getParticipants();
        setParticipants(data);
        setTotalParticipants(data.length);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchParticipants();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-red-600">Secret Santa Leaderboard</h2>
        <div className="bg-red-600 text-white px-4 py-2 rounded-full">
          Total Participants: {totalParticipants}
        </div>
      </div>
      <table className="w-full">
        <thead className="bg-red-100">
          <tr>
            <th className="p-3 text-left">Secret Name</th>
            <th className="p-3 text-left">Hobbies</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <tr key={index} className="border-b hover:bg-red-50">
              <td className="p-3">{participant.secret_name}</td>
              <td className="p-3">{participant.hobbies}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;