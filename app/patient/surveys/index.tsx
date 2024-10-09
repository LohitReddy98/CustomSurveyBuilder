
import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import globalStyles from '../../../styles/globalStyles';
import { useRouter } from 'expo-router';
import { useSurveyAssignments } from '../../../api/hooks/useSurveyAssignments';

export default function PatientSurveysScreen() {
  const router = useRouter();
  const { fetchAssignedSurveysForPatient, assignedSurveys, loading, error } = useSurveyAssignments();

  useEffect(() => {
    fetchAssignedSurveysForPatient();
  }, []);

  const handleSurveyPress = (survey: any) => {
    if (!survey.submitted) {
      router.push(`/patient/survey-view/${survey.surveyId}`);
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
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Assigned Surveys</Text>
      <FlatList
        data={assignedSurveys}
        keyExtractor={(item) => item.surveyId?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.surveyItem}>
            <Text style={styles.surveyTitle}>{item.title}</Text>
            <Button
              mode="contained"
              onPress={() => handleSurveyPress(item)}
              style={styles.startButton}
              disabled={item.submitted}
            >
              {item.submitted ? 'Completed' : 'Start Survey'}
            </Button>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  surveyItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  surveyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  startButton: {
    marginTop: 10,
  },
});
