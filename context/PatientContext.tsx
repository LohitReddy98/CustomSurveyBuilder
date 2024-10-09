
import React, { createContext, useState, ReactNode } from 'react';
import { Patient } from '../types';
import { mockPatients } from '@/data/mockPatients';

interface PatientContextProps {
  patients: Patient[];
}

export const PatientContext = createContext<PatientContextProps | undefined>(
  undefined
);

interface PatientProviderProps {
  children: ReactNode;
}

export const PatientProvider: React.FC<PatientProviderProps> = ({ children }) => {
  const [patients] = useState<Patient[]>(mockPatients);

  return (
    <PatientContext.Provider value={{ patients }}>
      {children}
    </PatientContext.Provider>
  );
};
