import axios from 'axios';
import { AvailableDate, Booking, User } from '../types';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

export const apiService = {
  login: async (username: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },

  getAvailableDates: async (year: number, month: number): Promise<AvailableDate[]> => {
    const response = await api.get('/availability', { params: { year, month } });
    return response.data;
  },

  createBooking: async (availabilityId: string, timeSlot: { startTime: string; endTime: string }, date: string): Promise<Booking> => {
    const response = await api.post('/bookings', { availabilityId, timeSlot, date });
    return response.data;
  },

  setAvailability: async (date: string, timeSlots: { startTime: string; endTime: string }[]): Promise<AvailableDate> => {
    const response = await api.post('/availability', { date, timeSlots });
    return response.data;
  },
};