// app/patient/surveys/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Survey } from '../../../types';
import { getAssignedSurveys } from '../../../api/surveys';

export default function PatientSurveysScreen() {
  const router = useRouter();
  const { patientId } = useLocalSearchParams<{ patientId?: string }>();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchSurveys();
  }, [patientId]);

  const fetchSurveys = async () => {
    if (patientId) {
      setLoading(true);
      const data = await getAssignedSurveys(Number(patientId));
      setSurveys(data);
      setLoading(false);
    }
  };


  const handleSurveyPress = (survey: Survey) => {
    router.push(`/patient/survey-view/${survey.id}?patientId=${patientId}`);
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Assigned Surveys</Text>
      <FlatList
        data={surveys}
        keyExtractor={(item) => item.id.toString()}
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
