import { useListQuery } from '@aegis/shared';
import { useCallback } from 'react';
import { CustomersQuery as CustomersQueryType } from '@aegis/shared';
import { Connection } from '@aegis/shared';
import { CustomerModel } from '../../model';
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
