// app/doctor/index.tsx
import React from 'react';
import { View } from 'react-native';
import Button from '../../components/common/Button';
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
    <View style={globalStyles.container}>
      <Button title="Create New Survey" onPress={handleCreateSurvey} />
      <Button title="View Created Surveys" onPress={handleViewSurveys} />
    </View>
  );
}
