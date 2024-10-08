// src/data/mockSurveys.ts

import { Survey } from "@/types";

export const  mockSurveys: Survey[] = [
  {
    id: 1,
    title: 'Daily Health Check',
    questions: [
      {
        id: 1,
        type: 'MULTIPLE_CHOICE',
        text: 'How are you feeling today?',
        options: ['Good', 'Okay', 'Bad'],
        isRequired: true,
      },
      {
        id: 2,
        type: 'SHORT_ANSWER',
        text: 'Any additional notes?',
        isRequired: false,
      },
    ],
  },
];
