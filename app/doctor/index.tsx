// app/dashboard/index.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import SurveyListItem from '../../components/SurveyListItem';
import Button from '../../components/common/Button';
import globalStyles from '../../styles/globalStyles';
import { useRouter } from 'expo-router';
import { Survey } from '../../types';
import { getSurveys, deleteSurvey as deleteSurveyApi } from '../../api/surveys';

export default function DashboardScreen() {
  const router = useRouter();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    setLoading(true);
    const data = await getSurveys();
    setSurveys(data);
    setLoading(false);
  };

  const handleCreateSurvey = () => {
    router.push('/doctor/survey-builder');
  };

  const handleEditSurvey = (survey: Survey) => {
    router.push(`/doctor/survey-builder?surveyId=${survey.id}`);
  };

  const handleAssignSurvey = (survey: Survey) => {
    router.push(`/doctor/survey-assignment?surveyId=${survey.id}`);
  };

  const handleViewResponses = (survey: Survey) => {
    router.push(`/doctor/survey-responses?surveyId=${survey.id}`);
  };

  const deleteSurvey = async (id: number) => {
    await deleteSurveyApi(id);
    fetchSurveys();
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" />
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
            onEdit={() => handleEditSurvey(item)}
            onDelete={() => deleteSurvey(item.id)}
            onAssign={() => handleAssignSurvey(item)}
            onViewResponses={() => handleViewResponses(item)}
          />
        )}
      />
    </View>
  );
}
