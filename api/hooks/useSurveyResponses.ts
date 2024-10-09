
import { useState } from 'react';
import api from '../api';
import { SurveyResponse } from '@/types';

export const useSurveyResponses = () => {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitResponse = async (surveyId: number, response: SurveyResponse) => {
    try {
      setLoading(true);
      await api.post(`/responses/${surveyId}`, response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit response');
    } finally {
      setLoading(false);
    }
  };

  const getResponsesForSurvey = async (surveyId: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/responses/${surveyId}`);
      setResponses(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get responses');
    } finally {
      setLoading(false);
    }
  };

  return { submitResponse, getResponsesForSurvey, responses, loading, error };
};
