// src/hooks/useAuth.ts
import { useState } from 'react';
import api from '../api';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (userData: { username: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: { emailOrUsername: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return { register, login, loading, error };
};
