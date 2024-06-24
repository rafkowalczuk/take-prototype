import { useState } from 'react';
import { request } from '../utils/request';
import { useAsyncEffect } from './useAsyncEffect.hook';
import { Subject } from '../model/existing-objects/Subject';

const useGetSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[] | null>(null);
  const [error, setError] = useState<unknown>(null);

  useAsyncEffect(async () => {
    const response = await request.get('/subjects');

    if (response.status === 200) {
      setSubjects(response.data);
    } else {
      setError(true);
    }
  }, []);
  return {
    subjects,
    error,
    updateList: setSubjects,
  };
};

export { useGetSubjects };
