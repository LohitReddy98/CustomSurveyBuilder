// app/patient/index.tsx
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import globalStyles from '../../styles/globalStyles';

export default function PatientWelcomeScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log('Patient Welcome Screen Loaded');
  }, []);

  const handleGoToSurveys = () => {
    // Navigate to the My Surveys page, passing the patientId
      router.push(`/patient/surveys`);
    
  };

  return (
    <View style={globalStyles.container}>
      {/* Welcome message */}
      <Text style={styles.welcomeText}>Welcome to the Patient Portal</Text>
      <Text style={styles.subText}>Please choose one of the following options:</Text>

      {/* Button to go to My Surveys */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleGoToSurveys}
      >
        <Text style={styles.buttonText}>Go to My Surveys</Text>
      </TouchableOpacity>

      {/* Additional options or buttons can be added here if needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
