import { useState } from 'react';
import { request } from '../utils/request';
import { Student } from '../model/existing-objects/Student';
import { BasicRequestResult } from '../types/BasicRequestResult';

const useGetStudent = () => {
  const [result, setResult] = useState<BasicRequestResult>(BasicRequestResult.Idle);

  const get = async (id: number | string): Promise<Student | null> => {
    setResult(BasicRequestResult.Loading);
    const response = await request.get(`/students/profile/${id}`);

    if (response.status === 200) {
      setResult(BasicRequestResult.Ok);
      return response.data;
    } else {
      setResult(BasicRequestResult.Error);
      return null;
    }
  };

  return {
    get,
    result,
  };
};

export { useGetStudent };
