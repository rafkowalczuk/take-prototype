interface Answer {
    surveyId: number;
    questionId: number;
    studentId: number;
    rating: number;
}

interface Result {
    questionContent: string;
    averageRating: number;
}

type GetSurveysResultResponse = Result[];

export type { Answer, Result, GetSurveysResultResponse };
