import { useCallback } from 'react';
import { SuppliersQuery as SuppliersQueryType } from '@aegis/shared';
import { useListQuery } from '@aegis/shared';
import { Connection } from '@aegis/shared';
import { SupplierModel } from '../../model';
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
