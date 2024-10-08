// app/survey-responses/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Survey } from '../../../types';
import { getSurveyById, getSurveyResponses } from '../../../api/surveys';
import globalStyles from '@/styles/globalStyles';

export default function SurveyResponsesScreen() {
  const { surveyId } = useLocalSearchParams<{ surveyId?: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchSurveyData();
  }, [surveyId]);

  const fetchSurveyData = async () => {
    setLoading(true);
    const surveyData = await getSurveyById(Number(surveyId));
    const responseData = await getSurveyResponses(Number(surveyId));
    setSurvey(surveyData || null);
    setResponses(responseData || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!survey) {
    return (
      <View style={globalStyles.container}>
        <Text>Survey not found</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Responses for: {survey.title}</Text>
      {responses.map((response) => (
        <View key={response.id} style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>
            {response.patientName}
          </Text>
          {response.answers.map((answer : any, idx: any) => (
            <Text key={idx}>
              {survey.questions.find((q) => q.id === answer.questionId)?.text}: {answer.answer}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}
