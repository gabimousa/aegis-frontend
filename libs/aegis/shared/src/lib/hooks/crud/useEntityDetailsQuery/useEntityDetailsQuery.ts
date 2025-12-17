import { useQuery } from '@apollo/client/react';
import { UseEntityDetailsQueryProps } from './useEntityDetailsQueryProps';
import { UseEntityDetailsQueryReturn } from './useEntityDetailsQueryReturn';

export const useEntityDetailsQuery = <T, Q>({
  id,
  enabled = true,
  query,
  resultSelector,
}: UseEntityDetailsQueryProps<Q, T>): UseEntityDetailsQueryReturn<T> => {
  const variables = { id: id ?? '' };
  const shouldSkip = !enabled || !id || id === 'NEW';

  const { data, loading, error, refetch } = useQuery(query, {
    variables,
    skip: shouldSkip,
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });

  return {
    entity: resultSelector(data),
    loading,
    error,
    refetch,
  };
};
