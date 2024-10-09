// types/index.ts
export interface QuestionBase {
  id: number;
  questionType: 'MULTIPLE_CHOICE' | 'SHORT_ANSWER' | 'RATING_SCALE';
  questionText: string;
  isRequired: boolean;
}

export interface MultipleChoiceQuestion extends QuestionBase {
  type: 'MULTIPLE_CHOICE';
  options: string[];
}

export interface ShortAnswerQuestion extends QuestionBase {
  type: 'SHORT_ANSWER';
}

export interface RatingScaleQuestion extends QuestionBase {
  type: 'RATING_SCALE';
}

export type Question =
  | MultipleChoiceQuestion
  | ShortAnswerQuestion
  | RatingScaleQuestion;

  export type SurveyQuestion = {
    questionId: number | string; // String for new questions created on the frontend, number for existing questions from the backend
    surveyId: number; // Reference to the parent survey's ID
    questionText: string;
    questionType: 'MULTIPLE_CHOICE' | 'SHORT_ANSWER' | 'RATING_SCALE';
    options?: string[]; // Options for multiple-choice questions
    isRequired: boolean;
  };
  
  export type Survey = {
    id: number | string; // String for new surveys created on the frontend, number for existing surveys from the backend
    title: string;
    description?: string;
    questions: SurveyQuestion[];
    createdBy?: number; // ID of the doctor who created the survey
  };

export interface Patient {
  patientId: number;
  firstName: string;
  lastName: string;
}

export interface SurveyResponse {
  id: number;
  surveyId: number;
  patientId: number;
  patientName: string;
  answers: { [questionId: string]: string };
}
