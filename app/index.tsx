// app/index.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import globalStyles from '../styles/globalStyles';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Welcome to Custom Survey Form Builder</Text>
      <Button title="Physician Login" onPress={() => router.push('/doctor')} />
      <Button title="Patient Login" onPress={() => router.push('/patient')} />
    </View>
  );
}
