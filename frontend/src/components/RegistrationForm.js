import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { apiService } from '../services/api';

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [unwantedGifts, setUnwantedGifts] = useState(['', '', '']);

  const updateUnwantedGift = (index, value) => {
    const newUnwantedGifts = [...unwantedGifts];
    newUnwantedGifts[index] = value;
    setUnwantedGifts(newUnwantedGifts);
  };

  const onSubmit = async (data) => {
    // Combine form data with unwanted gifts
    const submitData = {
      ...data,
      unwantedGifts
    };

    try {
      const response = await apiService.register(submitData);
      
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'You have been registered for Secret Santa!',
        confirmButtonColor: '#C41E3A'
      });

      reset();
      setUnwantedGifts(['', '', '']);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.error || 'Something went wrong',
        confirmButtonColor: '#C41E3A'
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
        🎄 Secret Santa Registration 🎅
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-red-600 mb-2">Full Name</label>
          <input 
            type="text" 
            {...register('name', { required: 'Name is required' })}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-red-600 mb-2">Secret Name</label>
          <input 
            type="text" 
            {...register('secretName', { 
              required: 'Secret name is required',
              minLength: { value: 3, message: 'Secret name must be at least 3 characters' }
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Choose a unique secret name"
          />
          {errors.secretName && <p className="text-red-500 text-sm">{errors.secretName.message}</p>}
        </div>

        <div>
          <label className="block text-red-600 mb-2">Phone Number</label>
          <input 
            type="tel" 
            {...register('phone', { 
              required: 'Phone number is required',
              pattern: { 
                value: /^[0-9]{10}$/, 
                message: 'Please enter a valid 10-digit phone number' 
              }
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter 10-digit phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-red-600 mb-2">Email</label>
          <input 
            type="email" 
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-red-600 mb-2">Hobbies</label>
          <textarea 
            {...register('hobbies', { 
              required: 'Hobbies are required',
              minLength: { value: 10, message: 'Please provide more details about your hobbies' }
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Tell us about your hobbies"
            rows="3"
          />
          {errors.hobbies && <p className="text-red-500 text-sm">{errors.hobbies.message}</p>}
        </div>

        <div>
          <label className="block text-red-600 mb-2">3 Gifts You Don't Want</label>
          {unwantedGifts.map((gift, index) => (
            <input
              key={index}
              type="text"
              value={gift}
              onChange={(e) => updateUnwantedGift(index, e.target.value)}
              className="w-full p-2 border rounded-lg mb-2"
              placeholder={`Unwanted Gift ${index + 1}`}
            />
          ))}
        </div>

        <div className="space-y-2">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              {...register('termsAgreed', { 
                required: 'You must agree to the terms and conditions' 
              })}
              className="mr-2"
            />
            <span className="text-red-600">I agree to participate in the Secret Santa event</span>
          </label>
          {errors.termsAgreed && <p className="text-red-500 text-sm">{errors.termsAgreed.message}</p>}

          <label className="flex items-center">
            <input 
              type="checkbox" 
              {...register('privacyAgreed', { 
                required: 'You must agree to the privacy policy' 
              })}
              className="mr-2"
            />
            <span className="text-red-600">I agree to share my details with my Secret Santa</span>
          </label>
          {errors.privacyAgreed && <p className="text-red-500 text-sm">{errors.privacyAgreed.message}</p>}
        </div>

        <button 
          type="submit" 
          className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Register for Secret Santa
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;