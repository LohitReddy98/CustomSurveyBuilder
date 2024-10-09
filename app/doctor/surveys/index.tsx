
import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Alert, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useSurveys } from '@/api/hooks/useSurvey';
import globalStyles from '@/styles/globalStyles';
import SurveyListItem from '@/components/SurveyListItem';

export default function SurveysScreen() {
  const router = useRouter();
  const { surveys, loading, error, deleteSurvey } = useSurveys();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSurveys, setFilteredSurveys] = useState([]);

  useEffect(() => {
    setFilteredSurveys(
      surveys.filter((survey) =>
        survey.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, surveys]);

  const handleAssignSurvey = (surveyId: number) => {
    router.push(`/doctor/survey-assignment?surveyId=${surveyId}`);
  };

  const handleViewResponses = (surveyId: number) => {
    router.push(`/doctor/survey-responses?surveyId=${surveyId}`);
  };

  const handleDeleteSurvey = async (id: number) => {
    try {
      await deleteSurvey(id); 
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
      <TextInput
        placeholder="Search Surveys"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={styles.searchInput}
        mode="outlined"
      />
      <FlatList
        data={filteredSurveys}
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

const styles = StyleSheet.create({
  searchInput: {
    marginVertical: 10,
    backgroundColor: '#fff',
  },
});
