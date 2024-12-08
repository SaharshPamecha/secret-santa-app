import React, { useState, useEffect } from 'react';
import Input from './components/Input'
import Button from './components/Button'
import { Card, CardContent, CardHeader, CardTitle } from './components/Card';
import Checkbox  from './components/Checkbox';
import Label from './components/Label';
import { Gift, Clock, Users } from 'lucide-react';

// Main App Component
const SecretSantaApp = () => {
  const [registrationCount, setRegistrationCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [participants, setParticipants] = useState([]);

  // Time remaining calculation
  function calculateTimeRemaining() {
    // Create the deadline in IST (UTC+5:30)
    const registrationDeadline = new Date('2024-12-20T23:59:59+05:30');
    const now = new Date();
    const difference = registrationDeadline.getTime() - now.getTime();
  
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
    return { days, hours, minutes, seconds };
  }

  // Registration form component
  const RegistrationForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      secretName: '',
      phone: '',
      email: '',
      hobbies: '',
      unwantedGifts: ['', '', ''],
      agreedToTerms: false
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.agreedToTerms) {
        alert('Please agree to the terms and conditions');
        return;
      }

      // Add participant logic would go here
      setParticipants([...participants, formData]);
      setRegistrationCount(registrationCount + 1);
      
      // Reset form
      setFormData({
        name: '',
        secretName: '',
        phone: '',
        email: '',
        hobbies: '',
        unwantedGifts: ['', '', ''],
        agreedToTerms: false
      });
    };

    return (
      <Card className="bg-red-50 border-2 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-700">🎄 Secret Santa Registration 🎅</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Your Full Name</Label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
                className="bg-white"
              />
            </div>
            <div>
              <Label>Secret Santa Name</Label>
              <Input 
                value={formData.secretName}
                onChange={(e) => setFormData({...formData, secretName: e.target.value})}
                required 
                className="bg-white"
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input 
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required 
                className="bg-white"
              />
            </div>
            <div>
              <Label>Email Address</Label>
              <Input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
                className="bg-white"
              />
            </div>
            <div>
              <Label>Your Hobbies</Label>
              <Input 
                value={formData.hobbies}
                onChange={(e) => setFormData({...formData, hobbies: e.target.value})}
                className="bg-white"
              />
            </div>
            <div>
              <Label>3 Gifts You Do NOT Want</Label>
              {formData.unwantedGifts.map((gift, index) => (
                <Input 
                  key={index}
                  value={gift}
                  onChange={(e) => {
                    const newGifts = [...formData.unwantedGifts];
                    newGifts[index] = e.target.value;
                    setFormData({...formData, unwantedGifts: newGifts});
                  }}
                  placeholder={`Gift ${index + 1} to Avoid`}
                  className="mb-2 bg-white"
                />
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) => setFormData({...formData, agreedToTerms: !!checked})}
              />
              <Label htmlFor="terms">
                I agree to the Secret Santa terms and conditions
              </Label>
            </div>
            <button type="button" className="btn-warning">
              Register for Secret Santa
            </button>
          </form>
        </CardContent>
      </Card>
    );
  };

  // Leaderboard Component
  const Leaderboard = () => {
    return (
      <Card className="bg-white border-2 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-700 flex items-center">
            <Users className="mr-2" /> Secret Santa Participants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="bg-red-100">
                <th className="p-2">Secret Name</th>
                <th className="p-2">Real Name</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 text-center">{participant.secretName}</td>
                  <td className="p-2 text-center">{participant.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    );
  };

  // Counter Component
  const CountdownTimer = () => {
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining());
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="bg-red-600 text-white p-4 rounded-lg flex justify-between items-center">
        <div className="flex items-center">
          <Clock className="mr-2" />
          <span>Registration Closes In:</span>
        </div>
        <div className="font-bold">
          {timeRemaining.days}d : {timeRemaining.hours}h : 
          {timeRemaining.minutes}m : {timeRemaining.seconds}s
        </div>
      </div>
    );
  };

  // Total Registrations Counter
  const RegistrationsCounter = () => {
    return (
      <div className="bg-green-600 text-white p-4 rounded-lg flex justify-between items-center">
        <div className="flex items-center">
          <Gift className="mr-2" />
          <span>Total Registrations:</span>
        </div>
        <div className="font-bold">{registrationCount}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-red-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center text-red-700 mb-6">
          🎄 Christmas Secret Santa 2024 🎅
        </h1>
        
        <CountdownTimer />
        <RegistrationsCounter />
        
        <div className="grid md:grid-cols-2 gap-6">
          <RegistrationForm />
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default SecretSantaApp;
