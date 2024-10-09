// app/dashboard/index.tsx
import React from 'react';
import { View, FlatList, ActivityIndicator, Alert } from 'react-native';
import SurveyListItem from '../../components/SurveyListItem';
import Button from '../../components/common/Button';
import globalStyles from '../../styles/globalStyles';
import { useRouter } from 'expo-router';
import { useSurveys } from '@/api/hooks/useSurvey';

export default function DashboardScreen() {
  const router = useRouter();
  const { surveys, loading, error, createSurvey, deleteSurvey } = useSurveys(); // Use the hook

  const handleCreateSurvey = () => {
    router.push('/doctor/survey-builder');
  };


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
      <Button title="Create New Survey" onPress={handleCreateSurvey} />
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
