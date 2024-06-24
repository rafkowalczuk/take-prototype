import { useState } from 'react';
import { request } from '../utils/request';
import { useAsyncEffect } from './useAsyncEffect.hook';
import { LecturerData } from '../model/existing-objects/Lecturer';

const useGetLecturers = () => {
  const [lecturers, setLecturers] = useState<LecturerData[] | null>(null);
  const [error, setError] = useState<unknown>(null);

  useAsyncEffect(async () => {
    const response = await request.get('/lecturers');

    if (response.status === 200) {
      setLecturers(response.data);
    } else {
      setError(true);
    }
  }, []);

  const updateList = (newList: LecturerData[]) => {
    setLecturers(newList);
  };

  return {
    lecturers,
    error,
    updateList,
  };
};

export { useGetLecturers };
