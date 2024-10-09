
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import globalStyles from '../../styles/globalStyles';

export default function PatientWelcomeScreen() {
  const router = useRouter();

  const handleGoToSurveys = () => {
    router.push(`/patient/surveys`);
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Text style={styles.welcomeText}>Welcome to the Patient Portal</Text>
      <Text style={styles.subText}>Please choose one of the following options:</Text>

      <Button
        mode="contained"
        onPress={handleGoToSurveys}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Go to My Surveys
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
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
    marginVertical: 10,
    alignSelf: 'center',
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
  },
});
