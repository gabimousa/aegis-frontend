import { CustomerFilterInput, CustomersQuery } from '@aegis/shared';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { gqlClient } from '../../../../shared';
import { CustomerModel } from '../../model';
import { CUSTOMERS_QUERY, CUSTOMERS_QUERY_KEY } from '../graphql';

export interface UseCustomersQueryProps {
  pageSize: number;
  searchTerm?: string;
  filters?: CustomerFilterInput;
}

export const useCustomersQuery = ({ pageSize, filters }: UseCustomersQueryProps) => {
  const result = useInfiniteQuery({
    queryKey: CUSTOMERS_QUERY_KEY({ filters }),
    queryFn: async ({ pageParam }) => {
      return gqlClient.request(CUSTOMERS_QUERY, {
        first: pageSize,
        after: pageParam ? `${pageParam}` : undefined,
        where: filters,
      });
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage: CustomersQuery) =>
      lastPage.customers?.pageInfo.hasNextPage ? lastPage.customers?.pageInfo.endCursor : undefined,
    // This ensures data is wiped as soon as you navigate away
    gcTime: 0,
    // Optional: set staleTime to 0 to ensure it always fetches fresh on mount
    staleTime: 0,
    // Optional: Keep the old data on screen while the new search fetches
    // to prevent the UI from jumping to a loading spinner
    placeholderData: (previousData) => previousData,
  });

  const customers = useMemo(() => {
    return (result.data?.pages.flatMap((page) => page.customers?.nodes ?? []) ||
      []) as CustomerModel[];
  }, [result.data]);

  const totalCount = useMemo(() => {
    return result.data?.pages
      ? result.data.pages[result.data.pages.length - 1].customers?.totalCount ?? 0
      : 0;
  }, [result.data]);

  return { ...result, customers, totalCount };
};
