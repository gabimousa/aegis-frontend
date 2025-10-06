import { useQuery } from '@apollo/client/react';
import { SuppliersQuery } from './suppliersQuery';

export const useSuppliers = (pageSize: number) => {
  const { data, loading, error, refetch } = useQuery(SuppliersQuery, {
    variables: { first: pageSize },
  });

  const nextPage = () => {
    if (data?.suppliers?.pageInfo?.hasNextPage) {
      refetch({
        first: pageSize,
        last: null,
        before: null,
        after: data.suppliers.pageInfo.endCursor,
      });
    }
  };

  const prevPage = () => {
    if (data?.suppliers?.pageInfo?.hasPreviousPage) {
      refetch({
        first: null,
        last: pageSize,
        before: data.suppliers.pageInfo.startCursor,
        after: null,
      });
    }
  };

  return { data, loading, error, refetch, nextPage, prevPage };
};
