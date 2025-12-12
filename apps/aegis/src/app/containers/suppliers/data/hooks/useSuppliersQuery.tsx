import { useCallback } from 'react';
import { SuppliersQuery as SuppliersQueryType } from '../../../../gql/graphql';
import { useListQuery } from '../../../../hooks/crud/useListQuery';
import { Connection } from '../../../../types';
import { SupplierModel } from '../../model/supplier.model';
import { SuppliersQuery } from '../graphql/suppliersQueries';

export interface UseSuppliersQueryProps {
  pageSize: number;
}

export const useSuppliersQuery = ({ pageSize }: UseSuppliersQueryProps) => {
  const connectionSelector = useCallback(
    (data?: SuppliersQueryType) => data?.suppliers as Connection<SupplierModel>,
    []
  );

  return useListQuery({
    pageSize,
    query: SuppliersQuery,
    connectionSelector,
  });
};
