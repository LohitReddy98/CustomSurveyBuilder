// src/api.ts
import { getToken, removeToken } from '@/utils/tokenService';
import axios from 'axios';

// Set your backend API base URL here
const API_BASE_URL = 'http://localhost:3000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Use getToken from the token service
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors by removing token and redirecting if needed
      console.error('Unauthorized! Removing token and redirecting.');
      removeToken(); // Use removeToken from the token service
    }
    return Promise.reject(error);
  }
);

export default api;
