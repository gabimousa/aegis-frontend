import {
  Connection,
  connectionsToDistinctArray,
  FieldDefinitionFilterInput,
  FieldDefinitionsQuery,
} from '@aegis/shared';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { gqlClient } from '../../../../../shared';
import { FieldDefinitionModel } from '../../model';
import { FIELD_DEFINITIONS_QUERY, FIELD_DEFINITIONS_QUERY_KEY } from '../graphql';

export interface UseFieldDefinitionsQueryProps {
  pageSize: number;
  searchTerm?: string;
  filters?: FieldDefinitionFilterInput;
}

export const useFieldDefinitionsQuery = ({ pageSize, filters }: UseFieldDefinitionsQueryProps) => {
  const result = useInfiniteQuery({
    queryKey: FIELD_DEFINITIONS_QUERY_KEY({ filters }),
    queryFn: async ({ pageParam }) => {
      return gqlClient.request(FIELD_DEFINITIONS_QUERY, {
        first: pageSize,
        after: pageParam ? `${pageParam}` : undefined,
        where: filters,
      });
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage: FieldDefinitionsQuery) =>
      lastPage.fieldDefinitions?.pageInfo.hasNextPage
        ? lastPage.fieldDefinitions?.pageInfo.endCursor
        : undefined,
    // This ensures data is wiped as soon as you navigate away
    gcTime: 0,
    // Optional: set staleTime to 0 to ensure it always fetches fresh on mount
    staleTime: 0,
    // Optional: Keep the old data on screen while the new search fetches
    // to prevent the UI from jumping to a loading spinner
    placeholderData: (previousData) => previousData,
  });

  const fieldDefinitions = useMemo(() => {
    const connections =
      result.data?.pages.map((page) => page.fieldDefinitions as Connection<FieldDefinitionModel>) ??
      [];
    return connectionsToDistinctArray(connections);
  }, [result.data]);

  const totalCount = useMemo(() => {
    return result.data?.pages
      ? (result.data.pages[result.data.pages.length - 1].fieldDefinitions?.totalCount ?? 0)
      : 0;
  }, [result.data]);

  return { ...result, fieldDefinitions, totalCount };
};
