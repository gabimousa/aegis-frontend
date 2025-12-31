import { SupplierFilterInput, SuppliersQuery } from '@aegis/shared';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { gqlClient } from '../../../../shared';
import { SupplierModel } from '../../model';
import { SUPPLIERS_QUERY, SUPPLIERS_QUERY_KEY } from '../graphql';

export interface UseSuppliersQueryProps {
  pageSize: number;
  searchTerm?: string;
  filters?: SupplierFilterInput;
}

export const useSuppliersQuery = ({ pageSize, filters }: UseSuppliersQueryProps) => {
  const result = useInfiniteQuery({
    queryKey: SUPPLIERS_QUERY_KEY({ filters }),
    queryFn: async ({ pageParam }) => {
      return gqlClient.request(SUPPLIERS_QUERY, {
        first: pageSize,
        after: pageParam ? `${pageParam}` : undefined,
        where: filters,
      });
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage: SuppliersQuery) =>
      lastPage.suppliers?.pageInfo.hasNextPage ? lastPage.suppliers?.pageInfo.endCursor : undefined,
    // This ensures data is wiped as soon as you navigate away
    gcTime: 0,
    // Optional: set staleTime to 0 to ensure it always fetches fresh on mount
    staleTime: 0,
    // Optional: Keep the old data on screen while the new search fetches
    // to prevent the UI from jumping to a loading spinner
    placeholderData: (previousData) => previousData,
  });

  const suppliers = useMemo(() => {
    return (result.data?.pages.flatMap((page) => page.suppliers?.nodes ?? []) ||
      []) as SupplierModel[];
  }, [result.data]);

  const totalCount = useMemo(() => {
    return result.data?.pages
      ? result.data.pages[result.data.pages.length - 1].suppliers?.totalCount ?? 0
      : 0;
  }, [result.data]);

  return { ...result, suppliers, totalCount };
};
