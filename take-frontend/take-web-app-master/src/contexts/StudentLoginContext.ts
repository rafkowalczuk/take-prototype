import { createContext } from 'react';
import { StudentLoginContextType } from '../types/StudentLoginContextType';

const StudentLoginContext = createContext<StudentLoginContextType>({
  update: () => null,
  student: null,
});

export { StudentLoginContext };
