// types/index.ts
export interface QuestionBase {
  id: number;
  type: 'MULTIPLE_CHOICE' | 'SHORT_ANSWER' | 'RATING_SCALE';
  text: string;
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
  scaleMin: number;
  scaleMax: number;
}

export type Question =
  | MultipleChoiceQuestion
  | ShortAnswerQuestion
  | RatingScaleQuestion;

export interface Survey {
  id: number;
  title: string;
  questions: Question[];
}

export interface Patient {
  id: number;
  name: string;
}

export interface SurveyResponse {
  id: number;
  surveyId: number;
  patientId: number;
  answers: { [questionId: string]: string };
}
