import { useState } from 'react';
import { request } from '../utils/request';
import { BasicRequestResult } from '../types/BasicRequestResult';
import { AddSubjectData } from './useAddSubject.hook';

type EditSubjectData = AddSubjectData;

const useEditSubject = () => {
  const [result, setResult] = useState<BasicRequestResult>(BasicRequestResult.Idle);

  const proceed = async (id: number | string, data: EditSubjectData) => {
    setResult(BasicRequestResult.Loading);
    const response = await request.put(`subjects/${id}`, data);

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

export { useEditSubject };
export type { EditSubjectData };
