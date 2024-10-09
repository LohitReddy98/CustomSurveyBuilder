
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import globalStyles from '../../styles/globalStyles';
import { useRouter } from 'expo-router';

export default function DoctorLandingPage() {
  const router = useRouter();

  const handleCreateSurvey = () => {
    router.push('/doctor/survey-builder');
  };

  const handleViewSurveys = () => {
    router.push('/doctor/surveys');
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Button
        mode="contained"
        onPress={handleCreateSurvey}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Create New Survey
      </Button>
      <Button
        mode="contained"
        onPress={handleViewSurveys}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        View Created Surveys
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
  },
});
