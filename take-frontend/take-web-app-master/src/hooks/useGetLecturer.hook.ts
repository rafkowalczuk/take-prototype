import { useState } from 'react';
import { request } from '../utils/request';
import { BasicRequestResult } from '../types/BasicRequestResult';
import { Lecturer } from '../model/existing-objects/Lecturer';

const useGetLecturer = () => {
  const [result, setResult] = useState<BasicRequestResult>(BasicRequestResult.Idle);

  const get = async (id: number | string): Promise<Lecturer | null> => {
    setResult(BasicRequestResult.Loading);
    const response = await request.get(`/lecturers/profile/${id}`);

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

export { useGetLecturer };
