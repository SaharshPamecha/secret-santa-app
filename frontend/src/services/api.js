import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const apiService = {
  register: async (participantData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, participantData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Registration failed');
    }
  },

  getRegistrationDeadline: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/registration-deadline`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to fetch deadline');
    }
  },

  getParticipants: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/participants`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to fetch participants');
    }
  }
};