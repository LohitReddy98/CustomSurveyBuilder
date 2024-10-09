// app/doctor/surveys/index.tsx
import React from 'react';
import { View, FlatList, ActivityIndicator, Alert, Text } from 'react-native';

import { useRouter } from 'expo-router';
import { useSurveys } from '@/api/hooks/useSurvey';
import globalStyles from '@/styles/globalStyles';
import SurveyListItem from '@/components/SurveyListItem';

export default function SurveysScreen() {
  const router = useRouter();
  const { surveys, loading, error, deleteSurvey } = useSurveys(); // Use the hook

  const handleAssignSurvey = (surveyId: number) => {
    router.push(`/doctor/survey-assignment?surveyId=${surveyId}`);
  };

  const handleViewResponses = (surveyId: number) => {
    router.push(`/doctor/survey-responses?surveyId=${surveyId}`);
  };

  const handleDeleteSurvey = async (id: number) => {
    try {
      await deleteSurvey(id); // Call the deleteSurvey function from the hook
      Alert.alert('Success', 'Survey deleted successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to delete survey.');
    }
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
        <Text style={globalStyles.subtitle}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={surveys}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SurveyListItem
            survey={item}
            onDelete={() => handleDeleteSurvey(item.id)}
            onAssign={() => handleAssignSurvey(item.id)}
            onViewResponses={() => handleViewResponses(item.id)}
          />
        )}
      />
    </View>
  );
}
