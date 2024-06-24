import { useState } from 'react';
import { request } from '../utils/request';
import { BasicRequestResult } from '../types/BasicRequestResult';

type AddStudentData = {
  firstName: string;
  lastName: string;
  email: string;
};

const useAddStudent = () => {
  const [result, setResult] = useState<BasicRequestResult>(BasicRequestResult.Idle);

  const proceed = async (data: AddStudentData) => {
    setResult(BasicRequestResult.Loading);
    const response = await request.post('students', data);

    if (response.status === 201) {
      setResult(BasicRequestResult.Ok);
    } else {
      setResult(BasicRequestResult.Error);
    }
  };

  return {
    proceed,
    result,
  };
};

export { useAddStudent };
export type { AddStudentData };
