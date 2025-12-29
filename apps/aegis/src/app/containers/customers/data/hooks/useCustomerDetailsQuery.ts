import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { gqlClient } from '../../../../shared';
import { CustomerDetailsModel } from '../../model';
import { CUSTOMER_DETAILS_QUERY, CUSTOMER_DETAILS_QUERY_KEY } from '../graphql/customersQueries';

export interface UseCustomerDetailsQueryProps {
  id?: string;
}

export const useCustomerDetailsQuery = ({ id }: UseCustomerDetailsQueryProps) => {
  const result = useQuery({
    queryKey: CUSTOMER_DETAILS_QUERY_KEY(id),
    queryFn: async () =>
      gqlClient.request(CUSTOMER_DETAILS_QUERY, {
        id: id ?? '',
      }),
    enabled: !!id,
    // This ensures data is wiped as soon as you navigate away
    gcTime: 0,
    // Optional: set staleTime to 0 to ensure it always fetches fresh on mount
    staleTime: 0,
  });

  const customer = useMemo(() => {
    return result.data?.customerById as CustomerDetailsModel | undefined;
  }, [result.data]);

  return { ...result, data: customer };
};
