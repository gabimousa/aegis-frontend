import type { ErrorLike } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { CustomersQueryVariables, PageInfo } from '../../../../gql/graphql';
import { usePagination, UsePaginationReturn } from '../../../../hooks/usePagination';
import { CustomerModel } from '../../model/customer.model';
import { CustomersQuery } from '../graphql/customersQueries';

export interface UseCustomersQueryProps {
  pageSize: number;
  searchTerm?: string;
  enabled?: boolean;
}

export interface UseCustomersQueryReturn extends UsePaginationReturn {
  customers: CustomerModel[];
  pageInfo?: PageInfo;
  totalCount: number;
  loading: boolean;
  error?: ErrorLike;
  refetch: () => void;
  hasData: boolean;
}

export const useCustomersQuery = ({
  pageSize,
  searchTerm,
  enabled = true,
}: UseCustomersQueryProps): UseCustomersQueryReturn => {
  const pagination = usePagination({ pageSize });

  const variables = useMemo((): CustomersQueryVariables => {
    const baseVariables: CustomersQueryVariables = { ...pagination.variables };

    if (searchTerm?.trim()) {
      baseVariables.where = {
        name: { contains: searchTerm.trim() },
      };
    }

    return baseVariables;
  }, [pagination.variables, searchTerm]);

  const { data, loading, error, refetch } = useQuery(CustomersQuery, {
    variables,
    skip: !enabled,
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });

  const customers = useMemo(
    () => (data?.customers?.nodes as CustomerModel[]) || [],
    [data?.customers?.nodes]
  );

  const pageInfo = data?.customers?.pageInfo;
  const totalCount = data?.customers?.totalCount ?? 0;
  const hasData = customers.length > 0;

  return {
    ...pagination,
    customers,
    pageInfo,
    totalCount,
    loading,
    error,
    refetch,
    hasData,
  };
};
