// app/patient/index.tsx
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import globalStyles from '../../styles/globalStyles';

export default function PatientLoginScreen() {
  const router = useRouter();
  const [patientId, setPatientId] = useState('');

  const handleLogin = () => {
    if (patientId) {
      router.push(`/patient/surveys?patientId=${patientId}`);
    } else {
      alert('Please enter your Patient ID');
    }
  };
// debug use effect to see if page loaded

  return (
    <View style={globalStyles.container}>
      <TextInput
        placeholder="Enter your Patient ID"
        value={patientId}
        onChangeText={setPatientId}
        style={globalStyles.input}
        keyboardType="numeric"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
