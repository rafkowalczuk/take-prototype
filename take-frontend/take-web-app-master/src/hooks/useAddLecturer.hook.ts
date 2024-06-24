import { useState } from 'react';
import { request } from '../utils/request';
import { BasicRequestResult } from '../types/BasicRequestResult';

type AddLecturerData = {
  firstName: string;
  lastName: string;
  email: string;
  subjectIds: number[];
};

const useAddLecturer = () => {
  const [result, setResult] = useState<BasicRequestResult>(BasicRequestResult.Idle);

  const proceed = async (data: AddLecturerData) => {
    setResult(BasicRequestResult.Loading);
    const response = await request.post('lecturers', data);

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

export { useAddLecturer };
export type { AddLecturerData };
