import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { gqlClient } from '../../../../../shared';
import { FieldDefinitionDetailsModel } from '../../model';
import { FIELD_DEFINITION_DETAILS_QUERY, FIELD_DEFINITION_DETAILS_QUERY_KEY } from '../graphql';

export interface UseFieldDefinitionDetailsQueryProps {
  id?: string;
}

export const useFieldDefinitionDetailsQuery = ({ id }: UseFieldDefinitionDetailsQueryProps) => {
  const result = useQuery({
    queryKey: FIELD_DEFINITION_DETAILS_QUERY_KEY(id),
    queryFn: async () =>
      gqlClient.request(FIELD_DEFINITION_DETAILS_QUERY, {
        id: id ?? '',
      }),
    enabled: !!id,
    // This ensures data is wiped as soon as you navigate away
    gcTime: 0,
    // Optional: set staleTime to 0 to ensure it always fetches fresh on mount
    staleTime: 0,
  });

  const fieldDefinition = useMemo(() => {
    return result.data?.fieldDefinitionById as FieldDefinitionDetailsModel | undefined;
  }, [result.data]);

  return { ...result, data: fieldDefinition };
};
