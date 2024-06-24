import { useState } from 'react';
import { request } from '../utils/request';
import { BasicRequestResult } from '../types/BasicRequestResult';
import { AddStudentData } from './useAddStudent.hook';

type EditStudentData = AddStudentData;

const useEditStudent = () => {
  const [result, setResult] = useState<BasicRequestResult>(BasicRequestResult.Idle);

  const proceed = async (id: number | string, data: EditStudentData) => {
    setResult(BasicRequestResult.Loading);
    const response = await request.put(`students/${id}`, data);

    if (response.status === 200) {
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

export { useEditStudent };
export type { EditStudentData };
