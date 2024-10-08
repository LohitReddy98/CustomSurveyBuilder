// api/surveys.ts
import { Survey, SurveyResponse } from '../types';
import { mockSurveys } from '../data/mockSurveys';

let surveys: Survey[] = [...mockSurveys];
let surveyAssignments: { surveyId: number; patientId: number }[] = [];
let surveyResponses: SurveyResponse[] = [];

export const getSurveys = (): Promise<Survey[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(surveys);
    }, 500);
  });
};

export const getSurveyById = (id: number): Promise<Survey | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(surveys.find((survey) => survey.id === id));
    }, 500);
  });
};

export const createSurvey = (survey: Survey): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      surveys.push(survey);
      resolve();
    }, 500);
  });
};

export const updateSurvey = (updatedSurvey: Survey): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      surveys = surveys.map((survey) =>
        survey.id === updatedSurvey.id ? updatedSurvey : survey
      );
      resolve();
    }, 500);
  });
};

export const deleteSurvey = (id: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      surveys = surveys.filter((survey) => survey.id !== id);
      // Remove any assignments and responses associated with the survey
      surveyAssignments = surveyAssignments.filter((assignment) => assignment.surveyId !== id);
      surveyResponses = surveyResponses.filter((response) => response.surveyId !== id);
      resolve();
    }, 500);
  });
};

export const assignSurveyToPatient = (surveyId: number, patientId: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      surveyAssignments.push({ surveyId, patientId });
      resolve();
    }, 500);
  });
};

export const getAssignedSurveys = (patientId: number): Promise<Survey[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const assignedSurveyIds = surveyAssignments
        .filter((assignment) => assignment.patientId === patientId)
        .map((assignment) => assignment.surveyId);
      const assignedSurveys = surveys.filter((survey) =>
        assignedSurveyIds.includes(survey.id)
      );
      resolve(assignedSurveys);
    }, 500);
  });
};

export const submitSurveyResponse = (
  surveyId: number,
  patientId: number,
  answers: any
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      surveyResponses.push({
        id: surveyResponses.length + 1,
        surveyId,
        patientId,
        answers,
      });
      resolve();
    }, 500);
  });
};

export const getSurveyResponses = (surveyId: number): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const responses = surveyResponses
        .filter((response) => response.surveyId === surveyId)
        .map((response) => ({
          id: response.id,
          patientName: `Patient ${response.patientId}`,
          answers: Object.keys(response.answers).map((questionId) => ({
            questionId: Number(questionId),
            answer: response.answers[questionId],
          })),
        }));
      resolve(responses);
    }, 500);
  });
};
