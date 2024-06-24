import { StudentSurveyListResponse } from './Survey';

interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface StudentWithSurveys extends Student {
  surveys: StudentSurveyListResponse;
}

export type { Student, StudentWithSurveys };
