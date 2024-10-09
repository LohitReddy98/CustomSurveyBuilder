
import { SurveyResponse } from '../types';

export const mockSurveyResponses: SurveyResponse[] = [
  {
    id: 1,
    surveyId: 1, 
    patientId: 1,
    patientName: 'John Doe', 
    answers: {
      '1': 'Good', 
      '2': 'I feel great today!', 
      '3': '3', 
    },
  },
  {
    id: 2,
    surveyId: 1,
    patientId: 2,
    patientName: 'Jane Smith', 
    answers: {
      '1': 'Okay',
      '2': '',
      '3': '2',
    },
  },
  {
    id: 3,
    surveyId: 2, 
    patientId: 1,
    patientName: 'John Doe', 
    answers: {
      '1': 'I like the flexible work hours.',
      '2': 'Health Insurance',
      '3': '5',
      '4': 'Very Likely',
    },
  },
  {
    id: 4,
    surveyId: 3, 
    patientId: 2,
    patientName: 'Jane Smith', 
    answers: {
      '1': '4', 
      '2': 'Yes',
      '3': 'Everything was great, but the wait time was a bit long.',
      '4': '30-60 minutes',
    },
  },
];
