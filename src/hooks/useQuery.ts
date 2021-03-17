import { QueryFunction, QueryKey, useQuery as useReactQuery, UseQueryOptions, UseQueryResult } from 'react-query';

function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>(queryKey: QueryKey, queryFn: QueryFunction<TQueryFnData>, options?: UseQueryOptions<TQueryFnData, TError, TData>):UseQueryResult<TData, TError> {
  const result = useReactQuery(queryKey, queryFn, options);
  const { isLoading, isError } = result;

  if (isLoading) {

  }

  if (isError) {
    
  }

  return result;
}

export default useQuery;