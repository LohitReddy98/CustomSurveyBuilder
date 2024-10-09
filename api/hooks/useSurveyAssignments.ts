import { useState, useEffect } from 'react';
import api from '../api';
import { Patient, Survey } from '@/types';

export const useSurveyAssignments = () => {
  const [assignedSurveys, setAssignedSurveys] = useState<{surveyId:string,title:string}[]>([]);
  const [assignedPatients, setAssignedPatients] = useState<Patient[]>([]);
  const [allPatients, setAllPatients] = useState<(Patient & { assigned: boolean })[]>([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
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

  
  const fetchAllPatientsWithSurveyStatus = async (surveyId: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/assignments/patients/${surveyId}`); 
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
    fetchAllPatientsWithSurveyStatus, 
    assignedSurveys,
    assignedPatients,
    allPatients, 
    loading,
    error,
  };
};
