// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator } from 'react-native-paper';
import { useRouter } from 'expo-router'; // Use useRouter from expo-router
import { useAuth } from '@/api/hooks/useAuth';
import { setToken } from '@/utils/tokenService';

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading, error } = useAuth(); // Destructure login, loading, and error from useAuth hook
  const router = useRouter(); // Get the router instance from expo-router

  const handleLogin = async () => {
    try {
      const data = await login({ emailOrUsername, password });
      if (data) {
        const { token, role } = data;

        // Save token to local storage using AsyncStorage
        await setToken(token);

        // Redirect based on role using router.push()
        if (role === 'doctor') {
          router.push('/doctor'); // Navigate to doctor screen
        } else if (role === 'patient') {
          router.push('/patient'); // Navigate to patient screen
        }
      }
    } catch (err) {
      Alert.alert('Login Failed', error || 'Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Email or Username"
        value={emailOrUsername}
        onChangeText={(text) => setEmailOrUsername(text)}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      {loading ? (
        <ActivityIndicator animating={true} color="#6200ee" />
      ) : (
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </Button>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  error: {
    marginTop: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default LoginPage;
