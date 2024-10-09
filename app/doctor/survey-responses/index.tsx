import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import globalStyles from '@/styles/globalStyles';
import { useSurveys } from '@/api/hooks/useSurvey';
import { useSurveyResponses } from '@/api/hooks/useSurveyResponses';

export default function SurveyResponsesScreen() {
  const { surveyId } = useLocalSearchParams<{ surveyId?: string }>();

  
  const { getSurveyById, currentSurvey, loading: surveyLoading } = useSurveys();
  const {
    getResponsesForSurvey,
    responses,
    loading: responsesLoading,
    error,
  } = useSurveyResponses();

  useEffect(() => {
    if (surveyId) {
      getSurveyById(Number(surveyId));
      getResponsesForSurvey(Number(surveyId));
    }
  }, [surveyId]);

  if (surveyLoading || responsesLoading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!currentSurvey) {
    return (
      <View style={globalStyles.container}>
        <Text>Survey not found</Text>
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
      <Text style={globalStyles.title}>Responses for: {currentSurvey.title}</Text>
      {responses.length === 0 ? (
        <Text>No responses yet.</Text>
      ) : (
        responses.map((response: any) => (
          <View key={response.id} style={styles.responseContainer}>
            <Text style={styles.patientName}>
              {response.Patient?.User?.username || 'Unknown'} ({response.Patient?.User?.email})
            </Text>
            {Object.entries(response.response).map(([questionId, answer]: [string, any]) => {
              const question = currentSurvey.questions.find((q: any) => q.questionId === Number(questionId));
              return (
                <View key={questionId} style={styles.answerContainer}>
                  <Text style={styles.questionText}>
                    {question ? question.questionText : `Question ID: ${questionId}`}:
                  </Text>
                  <Text style={styles.answerText}>{answer}</Text>
                </View>
              );
            })}
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  responseContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  patientName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  answerContainer: {
    marginBottom: 5,
  },
  questionText: {
    fontWeight: '600',
  },
  answerText: {
    marginLeft: 10,
  },
});
