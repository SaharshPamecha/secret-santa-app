import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const fetchDeadline = async () => {
      try {
        const deadlineData = await apiService.getRegistrationDeadline();
        const deadline = new Date(deadlineData.deadline);

        const timer = setInterval(() => {
          const now = new Date();
          const difference = deadline - now;

          if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeRemaining({ days, hours, minutes, seconds });
          } else {
            clearInterval(timer);
            setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          }
        }, 1000);

        return () => clearInterval(timer);
      } catch (error) {
        console.error('Error fetching deadline:', error);
      }
    };

    fetchDeadline();
  }, []);

  return (
    <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Registration Closes In:</h2>
      <div className="flex justify-center space-x-4">
        <div className="bg-white text-red-600 p-3 rounded-lg">
          <span className="text-3xl font-bold">{timeRemaining.days}</span>
          <p className="text-sm">Days</p>
        </div>
        <div className="bg-white text-red-600 p-3 rounded-lg">
          <span className="text-3xl font-bold">{timeRemaining.hours}</span>
          <p className="text-sm">Hours</p>
        </div>
        <div className="bg-white text-red-600 p-3 rounded-lg">
          <span className="text-3xl font-bold">{timeRemaining.minutes}</span>
          <p className="text-sm">Minutes</p>
        </div>
        <div className="bg-white text-red-600 p-3 rounded-lg">
          <span className="text-3xl font-bold">{timeRemaining.seconds}</span>
          <p className="text-sm">Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;