// app/patient/surveys/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Survey } from '../../../types';
import { useSurveyAssignments } from '../../../api/hooks/useSurveyAssignments'; // Import the hook

export default function PatientSurveysScreen() {
  const router = useRouter();
  const { fetchAssignedSurveysForPatient, assignedSurveys, loading, error } = useSurveyAssignments(); // Use the hook

  useEffect(() => {
      fetchAssignedSurveysForPatient(); // Fetch surveys assigned to the currently logged-in patient
    
  }, []);
  useEffect(() => {
    console.log(assignedSurveys);
  }
  , [assignedSurveys]);

  const handleSurveyPress = (survey: any) => {
    router.push(`/patient/survey-view/${survey.surveyId}`); 
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={globalStyles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Assigned Surveys</Text>
      <FlatList
        data={assignedSurveys}
        keyExtractor={(item) => item.surveyId ? item.surveyId.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSurveyPress(item)}
            style={{ padding: 15, borderBottomWidth: 1 }}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
