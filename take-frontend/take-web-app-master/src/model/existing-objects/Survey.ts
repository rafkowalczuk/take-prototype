import { Question } from './Question';

interface Survey {
  surveyId: number;
  name: string;
  dateCreated: string;
  questions: Question[];
  // lecturer: Lecturer;
}

interface BasicSurvey {
  surveyId: number;
  name: string;
}

type StudentSurveyListResponse = {
  surveyId: number;
  surveyName: string;
}[];

export type { Survey, BasicSurvey, StudentSurveyListResponse };
