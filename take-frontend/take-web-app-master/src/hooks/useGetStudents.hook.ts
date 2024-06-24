import { useState } from 'react';
import { request } from '../utils/request';
import { useAsyncEffect } from './useAsyncEffect.hook';
import { Student } from '../model/existing-objects/Student';

const useGetStudents = () => {
  const [students, setStudents] = useState<Student[] | null>(null);
  const [error, setError] = useState<unknown>(null);

  useAsyncEffect(async () => {
    const response = await request.get('/students');

    if (response.status === 200) {
      setStudents(response.data);
    } else {
      setError(true);
    }
  }, []);

  return {
    students,
    error,
    updateList: setStudents,
  };
};

export { useGetStudents };
