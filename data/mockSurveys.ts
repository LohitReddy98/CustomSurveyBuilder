// src/data/mockSurveys.ts

import { Survey } from '@/types';

export const mockSurveys: Survey[] = [
  {
    id: 1,
    title: 'Daily Health Check',
    questions: [
      {
        id: 1, // Start from 1
        type: 'MULTIPLE_CHOICE',
        text: 'How are you feeling today?',
        options: ['Good', 'Okay', 'Bad'],
        isRequired: true,
      },
      {
        id: 2, // Increment within the same survey
        type: 'SHORT_ANSWER',
        text: 'Any additional notes?',
        isRequired: false,
      },
      {
        id: 3,
        type: 'RATING_SCALE',
        text: 'Rate your pain level (1-5)',
        isRequired: true,
      },
    ],
  },
  {
    id: 2,
    title: 'Employee Feedback Survey',
    questions: [
      {
        id: 1, // Start from 1 again for a new survey
        type: 'SHORT_ANSWER',
        text: 'What do you like about your job?',
        isRequired: true,
      },
      {
        id: 2,
        type: 'MULTIPLE_CHOICE',
        text: 'Which of the following benefits do you value most?',
        options: ['Health Insurance', 'Paid Time Off', 'Retirement Plan', 'Other'],
        isRequired: true,
      },
      {
        id: 3,
        type: 'RATING_SCALE',
        text: 'Rate your overall job satisfaction',
        isRequired: true,
      },
      {
        id: 4,
        type: 'MULTIPLE_CHOICE',
        text: 'How likely are you to recommend this company to a friend?',
        options: ['Very Likely', 'Somewhat Likely', 'Neutral', 'Unlikely'],
        isRequired: true,
      },
    ],
  },
  {
    id: 3,
    title: 'Patient Satisfaction Survey',
    questions: [
      {
        id: 1, // Start from 1 for this survey
        type: 'RATING_SCALE',
        text: 'How would you rate your overall experience with our facility?',
        isRequired: true,
      },
      {
        id: 2,
        type: 'MULTIPLE_CHOICE',
        text: 'Was the staff courteous and professional?',
        options: ['Yes', 'No'],
        isRequired: true,
      },
      {
        id: 3,
        type: 'SHORT_ANSWER',
        text: 'Please provide any additional comments or suggestions.',
        isRequired: false,
      },
      {
        id: 4,
        type: 'MULTIPLE_CHOICE',
        text: 'How long was your wait time?',
        options: ['Less than 15 minutes', '15-30 minutes', '30-60 minutes', 'More than 1 hour'],
        isRequired: true,
      },
    ],
  },
  {
    id: 4,
    title: 'Product Feedback Survey',
    questions: [
      {
        id: 1, // Start from 1 for this survey
        type: 'SHORT_ANSWER',
        text: 'What product did you purchase?',
        isRequired: true,
      },
      {
        id: 2,
        type: 'RATING_SCALE',
        text: 'How satisfied are you with the product quality?',
        isRequired: true,
      },
      {
        id: 3,
        type: 'MULTIPLE_CHOICE',
        text: 'Would you recommend this product to others?',
        options: ['Yes', 'No', 'Maybe'],
        isRequired: true,
      },
      {
        id: 4,
        type: 'SHORT_ANSWER',
        text: 'What improvements would you suggest?',
        isRequired: false,
      },
      {
        id: 5,
        type: 'RATING_SCALE',
        text: 'How would you rate the value for money?',
        isRequired: true,
      },
    ],
  },
  {
    id: 5,
    title: 'Course Evaluation Survey',
    questions: [
      {
        id: 1, // Start from 1 for this survey
        type: 'RATING_SCALE',
        text: 'Rate the quality of the course materials (1-5)',
        isRequired: true,
      },
      {
        id: 2,
        type: 'RATING_SCALE',
        text: 'Rate the instructor’s teaching effectiveness',
        isRequired: true,
      },
      {
        id: 3,
        type: 'MULTIPLE_CHOICE',
        text: 'How would you describe the difficulty level of the course?',
        options: ['Too Easy', 'Just Right', 'Too Difficult'],
        isRequired: true,
      },
      {
        id: 4,
        type: 'SHORT_ANSWER',
        text: 'What did you like most about the course?',
        isRequired: false,
      },
      {
        id: 5,
        type: 'MULTIPLE_CHOICE',
        text: 'Would you recommend this course to others?',
        options: ['Yes', 'No'],
        isRequired: true,
      },
    ],
  },
  {
    id: 6,
    title: 'Fitness Center Feedback Survey',
    questions: [
      {
        id: 1, // Start from 1 for this survey
        type: 'MULTIPLE_CHOICE',
        text: 'Which facilities do you use the most?',
        options: ['Gym', 'Pool', 'Group Classes', 'Spa'],
        isRequired: true,
      },
      {
        id: 2,
        type: 'RATING_SCALE',
        text: 'Rate the cleanliness of the facility',
        isRequired: true,
      },
      {
        id: 3,
        type: 'RATING_SCALE',
        text: 'Rate the quality of the equipment',
        isRequired: true,
      },
      {
        id: 4,
        type: 'SHORT_ANSWER',
        text: 'What changes or improvements would you like to see?',
        isRequired: false,
      },
      {
        id: 5,
        type: 'MULTIPLE_CHOICE',
        text: 'How often do you visit the fitness center?',
        options: ['Daily', 'Weekly', 'Monthly', 'Occasionally'],
        isRequired: true,
      },
    ],
  },
  {
    id: 7,
    title: 'Event Feedback Survey',
    questions: [
      {
        id: 1, // Start from 1 for this survey
        type: 'RATING_SCALE',
        text: 'Rate the overall experience of the event',
        isRequired: true,
      },
      {
        id: 2,
        type: 'SHORT_ANSWER',
        text: 'What did you enjoy most about the event?',
        isRequired: false,
      },
      {
        id: 3,
        type: 'MULTIPLE_CHOICE',
        text: 'Would you attend a similar event in the future?',
        options: ['Yes', 'No', 'Maybe'],
        isRequired: true,
      },
      {
        id: 4,
        type: 'RATING_SCALE',
        text: 'Rate the quality of the speakers/presenters',
        isRequired: true,
      },
    ],
  },
];
