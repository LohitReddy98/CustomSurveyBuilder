import { useState, useEffect } from 'react';
import api from '../api';
import { Patient, Survey } from '@/types';

export const useSurveyAssignments = () => {
  const [assignedSurveys, setAssignedSurveys] = useState<{surveyId:string,title:string}[]>([]);
  const [assignedPatients, setAssignedPatients] = useState<Patient[]>([]);
  const [allPatients, setAllPatients] = useState<(Patient & { assigned: boolean })[]>([]); // State for all patients
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to assign a survey to a patient
  const assignSurveyToPatient = async (surveyId: number, patientId: number) => {
    try {
      setLoading(true);
      await api.post(`/assignments/${surveyId}`, { patientId });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to assign survey');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch surveys assigned to the currently logged-in patient
  const fetchAssignedSurveysForPatient = async () => {
    try {
      setLoading(true);
      const response = await api.get('/assignments/my');
      setAssignedSurveys(response.data?.surveys);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch assigned surveys');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch all patients assigned to a particular survey
  const fetchAssignedPatientsForSurvey = async (surveyId: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/assignments/survey/${surveyId}`);
      setAssignedPatients(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch assigned patients');
    } finally {
      setLoading(false);
    }
  };

  // New function to fetch all patients with their assignment status for a specific survey
  const fetchAllPatientsWithSurveyStatus = async (surveyId: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/assignments/patients/${surveyId}`); // Assuming the API endpoint accepts surveyId as a parameter
      setAllPatients(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch all patients');
    } finally {
      setLoading(false);
    }
  };

  return {
    assignSurveyToPatient,
    fetchAssignedSurveysForPatient,
    fetchAssignedPatientsForSurvey,
    fetchAllPatientsWithSurveyStatus, // Add this function to the return object
    assignedSurveys,
    assignedPatients,
    allPatients, // Include the new state for all patients
    loading,
    error,
  };
};
