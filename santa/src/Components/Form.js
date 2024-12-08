import React, { useState } from 'react';
import './Form.css';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    secretName: '',
    phone: '',
    email: '',
    hobbies: '',
    unwantedGifts: ['', '', ''],
    agreedToTerms: false,
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [disabled, setDisabled] = useState(false)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUnwantedGiftChange = (index, value) => {
    const updatedGifts = [...formData.unwantedGifts];
    updatedGifts[index] = value;
    setFormData({ ...formData, unwantedGifts: updatedGifts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setDisabled(true)
        setFormData({
            name: '',
            secretName: '',
            phone: '',
            email: '',
            hobbies: '',
            unwantedGifts: ['', '', ''],
            agreedToTerms: false,
          })
      console.log("Clicked")
      const response = await fetch('https://secret-santa-app-r148.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setStatusMessage('Form submitted successfully!');
      console.log(result)
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('Failed to submit the form.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Secret Santa Form</h2>

      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Secret Name:</label>
      <input
        type="text"
        name="secretName"
        value={formData.secretName}
        onChange={handleChange}
        required
      />

      <label>Phone:</label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>Hobbies:</label>
      <input
        type="text"
        name="hobbies"
        value={formData.hobbies}
        onChange={handleChange}
      />

      <label>Unwanted Gifts:</label>
      {formData.unwantedGifts.map((gift, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Gift ${index + 1}`}
          value={gift}
          onChange={(e) => handleUnwantedGiftChange(index, e.target.value)}
        />
      ))}

      <label>
        <input
          type="checkbox"
          name="agreedToTerms"
          checked={formData.agreedToTerms}
          onChange={handleChange}
          required
        />
        I agree to the terms and conditions
      </label>

      <button type="submit" disabled={disabled}>Submit</button>
      {statusMessage && <p className="success">{statusMessage}</p>}
    </form>
  );
}

export default Form;
