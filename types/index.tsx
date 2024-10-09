
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
    questionId: number | string; 
    surveyId: number; 
    questionText: string;
    questionType: 'MULTIPLE_CHOICE' | 'SHORT_ANSWER' | 'RATING_SCALE';
    options?: string[]; 
    isRequired: boolean;
  };
  
  export type Survey = {
    id: number | string; 
    title: string;
    description?: string;
    questions: SurveyQuestion[];
    createdBy?: number; 
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
