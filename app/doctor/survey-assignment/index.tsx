// app/doctor/survey-assignment/index.tsx
import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../../../styles/colors';
import { useRouter, useLocalSearchParams } from 'expo-router';
import globalStyles from '@/styles/globalStyles';
import { useSurveyAssignments } from '@/api/hooks/useSurveyAssignments';

export default function SurveyAssignmentScreen() {
  const { surveyId } = useLocalSearchParams<{ surveyId?: string }>(); // Get surveyId from params
  const { fetchAllPatientsWithSurveyStatus, assignSurveyToPatient, allPatients, loading, error } = useSurveyAssignments(); // Use hook
  const router = useRouter();

  useEffect(() => {
    if (surveyId) {
      fetchAllPatientsWithSurveyStatus(Number(surveyId)); // Fetch patients when surveyId is available
    }
  }, [surveyId]);

  // Function to handle assigning the survey to a patient
  const handleAssign = async (patientId: number) => {
    if (surveyId) {
      await assignSurveyToPatient(Number(surveyId), patientId);
      await fetchAllPatientsWithSurveyStatus(Number(surveyId)); // Refresh the patient list after assignment
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
      <Text style={globalStyles.title}>Patients for Survey: {surveyId}</Text>
      <FlatList
        data={allPatients}
        keyExtractor={(item) => item.patientId.toString()}
        renderItem={({ item }) => (
          <View style={styles.patientItem}>
            <Text style={styles.patientName}>
              {item.firstName} {item.lastName}
            </Text>
            {item.assigned ? (
              <Text style={[styles.statusText, styles.assignedText]}>Assigned</Text>
            ) : (
              <TouchableOpacity
                onPress={() => handleAssign(item.patientId)}
                style={styles.assignButton}
              >
                <Text style={styles.assignButtonText}>Assign Survey</Text>
              </TouchableOpacity>
            )}
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
  statusText: {
    fontSize: 14,
  },
  assignedText: {
    color: 'green',
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
