import { useQuery } from '@apollo/client/react';
import { CustomersQueryVariables } from '../../../gql/graphql';
import { CustomersQuery } from './customersQuery';

export const useCustomers = (pageSize: number, searchTerm?: string) => {
  const variables: CustomersQueryVariables = { first: pageSize };
  if (searchTerm) {
    variables.where = { name: { contains: searchTerm } };
  }
  const { data, loading, error, refetch } = useQuery(CustomersQuery, {
    variables,
  });

  const nextPage = () => {
    if (data?.customers?.pageInfo?.hasNextPage) {
      refetch({
        first: pageSize,
        last: null,
        before: null,
        after: data.customers.pageInfo.endCursor,
      });
    }
  };

  const prevPage = () => {
    if (data?.customers?.pageInfo?.hasPreviousPage) {
      refetch({
        first: null,
        last: pageSize,
        before: data.customers.pageInfo.startCursor,
        after: null,
      });
    }
  };

  return { data, loading, error, refetch, nextPage, prevPage };
};
