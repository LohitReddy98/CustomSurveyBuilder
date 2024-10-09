
import { getToken, removeToken } from '@/utils/tokenService';
import axios from 'axios';


const API_BASE_URL = 'http://192.168.6.70:3000/api';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  async (config) => {
    const token = await getToken(); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      
      console.error('Unauthorized! Removing token and redirecting.');
      removeToken(); 
    }
    return Promise.reject(error);
  }
);

export default api;
