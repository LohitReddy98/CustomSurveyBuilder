
import React, { createContext, useState, ReactNode } from 'react';
import { mockSurveys } from '../data/mockSurveys';
import { Survey } from '../types';

interface SurveyContextProps {
  surveys: Survey[];
  addSurvey: (survey: Survey) => void;
  updateSurvey: (survey: Survey) => void;
  deleteSurvey: (id: number) => void;
}

export const SurveyContext = createContext<SurveyContextProps | undefined>(
  undefined
);

interface SurveyProviderProps {
  children: ReactNode;
}

export const SurveyProvider: React.FC<SurveyProviderProps> = ({ children }) => {
  const [surveys, setSurveys] = useState<Survey[]>(mockSurveys);

  const addSurvey = (survey: Survey) => {
    setSurveys([...surveys, survey]);
  };

  const updateSurvey = (updatedSurvey: Survey) => {
    setSurveys(
      surveys.map((survey) =>
        survey.id === updatedSurvey.id ? updatedSurvey : survey
      )
    );
  };

  const deleteSurvey = (id: number) => {
    setSurveys(surveys.filter((survey) => survey.id !== id));
  };

  return (
    <SurveyContext.Provider
      value={{ surveys, addSurvey, updateSurvey, deleteSurvey }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
