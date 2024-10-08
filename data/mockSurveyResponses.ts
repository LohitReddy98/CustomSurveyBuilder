// data/mockSurveyResponses.ts
import { SurveyResponse } from '../types';

export const mockSurveyResponses: SurveyResponse[] = [
  {
    id: 1,
    surveyId: 1, // Refers to the 'Daily Health Check' survey
    patientId: 1,
    patientName: 'John Doe', // Adding patientName field
    answers: {
      '1': 'Good', // Answer to 'How are you feeling today?'
      '2': 'I feel great today!', // Answer to 'Any additional notes?'
      '3': '3', // Rating answer to 'Rate your pain level'
    },
  },
  {
    id: 2,
    surveyId: 1,
    patientId: 2,
    patientName: 'Jane Smith', // Adding patientName field
    answers: {
      '1': 'Okay',
      '2': '',
      '3': '2',
    },
  },
  {
    id: 3,
    surveyId: 2, // Refers to the 'Employee Feedback Survey'
    patientId: 1,
    patientName: 'John Doe', // Adding patientName field
    answers: {
      '1': 'I like the flexible work hours.',
      '2': 'Health Insurance',
      '3': '5',
      '4': 'Very Likely',
    },
  },
  {
    id: 4,
    surveyId: 3, // Refers to the 'Patient Satisfaction Survey'
    patientId: 2,
    patientName: 'Jane Smith', // Adding patientName field
    answers: {
      '1': '4', // Rating answer to 'How would you rate your overall experience with our facility?'
      '2': 'Yes',
      '3': 'Everything was great, but the wait time was a bit long.',
      '4': '30-60 minutes',
    },
  },
];
