// app/survey-assignment/index.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import colors from '../../../styles/colors';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Survey, Patient } from '../../../types';
import { getPatients } from '../../../api/patients';
import { assignSurveyToPatient, getSurveyById } from '@/api/surveys';
import globalStyles from '@/styles/globalStyles';

export default function SurveyAssignmentScreen() {
  const { surveyId } = useLocalSearchParams<{ surveyId?: string }>();
  const router = useRouter();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, [surveyId]);

  const fetchData = async () => {
    setLoading(true);
    const [surveyData, patientData] = await Promise.all([
      getSurveyById(Number(surveyId)),
      getPatients(),
    ]);
    setSurvey(surveyData || null);
    setPatients(patientData);
    setLoading(false);
  };

  const handleAssign = async (patient: Patient) => {
    if (survey) {
      await assignSurveyToPatient(survey.id, patient.id);
      alert(`Survey "${survey.title}" assigned to ${patient.name}`);
      router.back();
    }
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
      <Text style={globalStyles.title}>Assign Survey: {survey.title}</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.patientItem}>
            <Text style={styles.patientName}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => handleAssign(item)}
              style={styles.assignButton}
            >
              <Text style={styles.assignButtonText}>Assign Survey</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  patientItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.placeholder,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patientName: {
    fontSize: 16,
    color: colors.text,
  },
  assignButton: {
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 5,
  },
  assignButtonText: {
    color: colors.surface,
  },
});
