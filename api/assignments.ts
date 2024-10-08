// // api/assignments.ts

// import { mockAssignments } from '@/data/mockAssignments';
// import { Assignment, Response } from '../types';
// import { mockResponses } from '@/data/mockResponses';


// let assignments: Assignment[] = [...mockAssignments];
// let responses: Response[] = [...mockResponses];

// export const assignSurveyToPatient = (
//   surveyId: number,
//   patientId: number
// ): Promise<void> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const newAssignment: Assignment = {
//         id: Date.now(),
//         surveyId,
//         patientId,
//         assignedAt: new Date(),
//         completed: false,
//       };
//       assignments.push(newAssignment);
//       resolve();
//     }, 500);
//   });
// };

// export const getAssignmentsByPatientId = (
//   patientId: number
// ): Promise<Assignment[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(assignments.filter((a) => a.patientId === patientId));
//     }, 500);
//   });
// };

// export const submitResponse = (response: Response): Promise<void> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       responses.push(response);
//       // Mark assignment as completed
//       const assignment = assignments.find(
//         (a) => a.id === response.assignmentId
//       );
//       if (assignment) {
//         assignment.completed = true;
//       }
//       resolve();
//     }, 500);
//   });
// };

// export const getResponsesBySurveyId = (
//   surveyId: number
// ): Promise<Response[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const surveyAssignments = assignments
//         .filter((a) => a.surveyId === surveyId)
//         .map((a) => a.id);
//       resolve(responses.filter((r) => surveyAssignments.includes(r.assignmentId)));
//     }, 500);
//   });
// };
