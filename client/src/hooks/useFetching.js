import { useState } from 'react';

export const useFetching = (cb) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async (...params) => {
    try {
      setIsLoading(true);
      await cb(...params);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
