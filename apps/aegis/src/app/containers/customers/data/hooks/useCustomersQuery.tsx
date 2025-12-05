import { useCallback } from 'react';
import { CustomersQuery as CustomersQueryType } from '../../../../gql/graphql';
import { Connection, useEntitiesQuery } from '../../../../hooks';
import { CustomerModel } from '../../model/customer.model';
import { CustomersQuery } from '../graphql/customersQueries';

export interface UseCustomersQueryProps {
  pageSize: number;
  searchTerm?: string;
  enabled?: boolean;
}

export const useCustomersQuery = ({ pageSize, enabled = true }: UseCustomersQueryProps) => {
  const connectionSelector = useCallback(
    (data?: CustomersQueryType) => data?.customers as Connection<CustomerModel>,
    []
  );

  return useEntitiesQuery({
    pageSize,
    enabled,
    query: CustomersQuery,
    connectionSelector,
  });
};
