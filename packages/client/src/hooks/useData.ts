import { AxiosRequestConfig, CanceledError } from 'axios';

import { useEffect, useState } from 'react';

import apiClient from '../services/api-client';

interface FetchResponse<T> {
   count: number;
   results: T[];
}

const useData = <T>(
   endpoint: string,
   requestConfig?: AxiosRequestConfig,
   deps: any[] = []
) => {
   const [data, setData] = useState<T[]>([]);
   const [error, setError] = useState('');
   const [isLoading, setLoading] = useState(false);

   useEffect(() => {
      const controller = new AbortController();

      setLoading(true);
      setError('');

      apiClient
         .get<FetchResponse<T>>(endpoint, {
            signal: controller.signal,
            ...requestConfig,
         })
         .then((response) => {
            setData(response.data.results);
         })
         .catch((error) => {
            if (error instanceof CanceledError) {
               return;
            }

            setError(
               error.response?.data?.detail ||
                  error.response?.data?.message ||
                  error.message ||
                  'Something went wrong.'
            );
         })
         .finally(() => {
            setLoading(false);
         });

      return () => controller.abort();
   }, [endpoint, ...deps]);

   return {
      data,
      error,
      isLoading,
   };
};

export default useData;
