// api/patients.ts
import { Patient } from '../types';
import { mockPatients } from '../data/mockPatients';

let patients: Patient[] = [...mockPatients];

export const getPatients = (): Promise<Patient[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(patients);
    }, 500);
  });
};

export const getPatientById = (id: number): Promise<Patient | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(patients.find((patient) => patient.id === id));
    }, 500);
  });
};
