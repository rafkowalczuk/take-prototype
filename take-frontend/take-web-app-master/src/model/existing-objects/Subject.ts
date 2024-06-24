interface Subject {
  id: number;
  name: string;
}

interface SubjectWithLecturers {
  subjectId: number;
  name: string;
  lecturersNames: string[];
}

export type { Subject, SubjectWithLecturers };
