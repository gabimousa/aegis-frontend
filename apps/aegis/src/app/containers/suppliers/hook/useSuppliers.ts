import { useQuery } from '@apollo/client/react';
import { SuppliersQueryVariables } from '../../../gql/graphql';
import { SuppliersQuery } from './suppliersQuery';

export const useSuppliers = (pageSize: number, searchTerm?: string) => {
  const variables: SuppliersQueryVariables = { first: pageSize };
  if (searchTerm) {
    variables.where = { name: { contains: searchTerm } };
  }
  const { data, loading, error, refetch } = useQuery(SuppliersQuery, {
    variables,
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
