// src/utils/tokenService.ts
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get token from the correct storage
export const getToken = async (): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return localStorage.getItem('token');
  } else {
    return await AsyncStorage.getItem('token');
  }
};

// Set token in the correct storage
export const setToken = async (token: string): Promise<void> => {
  if (Platform.OS === 'web') {
    localStorage.setItem('token', token);
  } else {
    await AsyncStorage.setItem('token', token);
  }
};

// Remove token from the correct storage
export const removeToken = async (): Promise<void> => {
  if (Platform.OS === 'web') {
    localStorage.removeItem('token');
  } else {
    await AsyncStorage.removeItem('token');
  }
};
