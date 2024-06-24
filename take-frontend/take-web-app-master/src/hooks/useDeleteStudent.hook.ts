import { useState } from 'react';
import { request } from '../utils/request';
import { BasicRequestResult } from '../types/BasicRequestResult';

const useDeleteStudent = () => {
  const [result, setResult] = useState<BasicRequestResult>(BasicRequestResult.Idle);

  const proceed = async (email: string) => {
    setResult(BasicRequestResult.Loading);
    const response = await request.delete(`students/email/${encodeURIComponent(email)}`);

    if (response.status === 204) {
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

export { useDeleteStudent };
