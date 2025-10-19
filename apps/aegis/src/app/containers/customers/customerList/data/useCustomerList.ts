import { useQuery } from '@apollo/client/react';
import { CustomersQueryVariables } from '../../../../gql/graphql';
import { CustomerListQuery } from './customerListQuery';

export const useCustomerList = (pageSize: number, searchTerm?: string) => {
  const variables: CustomersQueryVariables = { first: pageSize };
  if (searchTerm) {
    variables.where = { name: { contains: searchTerm } };
  }
  const { data, loading, error, refetch } = useQuery(CustomerListQuery, {
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
