interface LecturerData {
  lecturerId: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface Lecturer extends LecturerData {
  subjects: string[];
  surveys: string[];
}

export type { LecturerData, Lecturer };
