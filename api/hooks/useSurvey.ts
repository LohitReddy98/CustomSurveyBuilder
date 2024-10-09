
import { useState, useEffect } from 'react';
import api from '../api';
import { Survey } from '@/types';
export const useSurveys = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSurvey, setCurrentSurvey] = useState<Survey | null>(null);

  
  useEffect(() => {
    const fetchSurveys = async () => {
      setLoading(true);
      try {
        const response = await api.get('/surveys');
        setSurveys(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch surveys');
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  
  const createSurvey = async (newSurvey: Survey) => {
    try {
      setLoading(true);
      const response = await api.post('/surveys', newSurvey);
      setSurveys((prevSurveys) => [...prevSurveys, response.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create survey');
    } finally {
      setLoading(false);
    }
  };

  
  const getSurveyById = async (id: number) => {
    setLoading(true);
    try {
      const response = await api.get(`/surveys/${id}`);
      setCurrentSurvey(response.data); 
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch survey');
      return null;
    } finally {
      setLoading(false);
    }
  };



  
  const deleteSurvey = async (surveyId: number) => {
    try {
      setLoading(true);
      await api.delete(`/surveys/${surveyId}`);
      setSurveys((prevSurveys) => prevSurveys.filter((survey) => survey.id !== surveyId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete survey');
    } finally {
      setLoading(false);
    }
  };

  return {
    surveys,
    currentSurvey,
    setCurrentSurvey, 
    createSurvey,
    getSurveyById,
    deleteSurvey,
    loading,
    error,
  };
};
