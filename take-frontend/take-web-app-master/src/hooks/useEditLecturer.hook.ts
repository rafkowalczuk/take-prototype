import { useState } from 'react';
import { request } from '../utils/request';
import { BasicRequestResult } from '../types/BasicRequestResult';
import { AddLecturerData } from './useAddLecturer.hook';

type EditLecturerData = AddLecturerData;

const useEditLecturer = () => {
  const [result, setResult] = useState<BasicRequestResult>(BasicRequestResult.Idle);

  const proceed = async (id: number | string, data: EditLecturerData) => {
    setResult(BasicRequestResult.Loading);
    const response = await request.put(`lecturers/${id}`, data);

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

export { useEditLecturer };
export type { AddLecturerData };
