import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import colors from '../../../styles/colors';
import { useRouter, useLocalSearchParams } from 'expo-router';
import globalStyles from '@/styles/globalStyles';
import { useSurveyAssignments } from '@/api/hooks/useSurveyAssignments';
import { showAlert } from '@/utils/helper';

export default function SurveyAssignmentScreen() {
  const { surveyId } = useLocalSearchParams<{ surveyId?: string }>();
  const { fetchAllPatientsWithSurveyStatus, assignSurveyToPatient, allPatients, loading, error } = useSurveyAssignments();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    if (surveyId) {
      fetchAllPatientsWithSurveyStatus(Number(surveyId));
    }
  }, [surveyId]);

  useEffect(() => {
    setFilteredPatients(
      allPatients.filter((patient) =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, allPatients]);

  const handleAssign = async (patientId: number) => {
    if (surveyId) {
      await assignSurveyToPatient(Number(surveyId), patientId);
      showAlert('Success', 'Survey assigned successfully!');
      await fetchAllPatientsWithSurveyStatus(Number(surveyId));
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
      <Text style={globalStyles.title}>Assign Survey: {surveyId}</Text>
      <TextInput
        placeholder="Search Patients"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={styles.searchInput}
        mode="outlined"
      />
      <FlatList
        data={filteredPatients}
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
  searchInput: {
    marginVertical: 10,
    backgroundColor: '#fff',
  },
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
