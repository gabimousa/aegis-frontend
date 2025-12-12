import { useCallback } from 'react';
import { CustomersQuery as CustomersQueryType } from '../../../../gql/graphql';
import { useListQuery } from '../../../../hooks/crud/useListQuery';
import { Connection } from '../../../../types';
import { CustomerModel } from '../../model/customer.model';
import { CustomersQuery } from '../graphql/customersQueries';

export interface UseCustomersQueryProps {
  pageSize: number;
}

export const useCustomersQuery = ({ pageSize }: UseCustomersQueryProps) => {
  const connectionSelector = useCallback(
    (data?: CustomersQueryType) => data?.customers as Connection<CustomerModel>,
    []
  );

  return useListQuery({
    pageSize,
    query: CustomersQuery,
    connectionSelector,
  });
};
