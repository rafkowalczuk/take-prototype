type StudentLoginContextStudentData = {
  id: number;
  name: string;
  surname: string;
  email: string;
};

type StudentLoginContextType = {
  student: StudentLoginContextStudentData | null;
  update: (data: StudentLoginContextStudentData | null) => void;
};

export type { StudentLoginContextStudentData, StudentLoginContextType };
