import { useState } from 'react';
import { request } from '../utils/request';
import { BasicRequestResult } from '../types/BasicRequestResult';

type AddSubjectData = {
  name: string;
};

const useAddSubject = () => {
  const [result, setResult] = useState<BasicRequestResult>(BasicRequestResult.Idle);

  const proceed = async (data: AddSubjectData) => {
    setResult(BasicRequestResult.Loading);
    const response = await request.post('subjects', data);

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

export { useAddSubject };
export type { AddSubjectData };
