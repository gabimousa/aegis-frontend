import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { gqlClient } from '../../../../shared';
import { SupplierDetailsModel } from '../../model';
import { SUPPLIER_DETAILS_QUERY, SUPPLIER_DETAILS_QUERY_KEY } from '../graphql';

export interface UseSupplierDetailsQueryProps {
  id?: string;
}

export const useSupplierDetailsQuery = ({ id }: UseSupplierDetailsQueryProps) => {
  const result = useQuery({
    queryKey: SUPPLIER_DETAILS_QUERY_KEY(id),
    queryFn: async () =>
      gqlClient.request(SUPPLIER_DETAILS_QUERY, {
        id: id ?? '',
      }),
    enabled: !!id,
    // This ensures data is wiped as soon as you navigate away
    gcTime: 0,
    // Optional: set staleTime to 0 to ensure it always fetches fresh on mount
    staleTime: 0,
  });

  const supplier = useMemo(() => {
    return result.data?.supplierById as SupplierDetailsModel | undefined;
  }, [result.data]);

  return { ...result, data: supplier };
};
