import {
  SupplierDetailsQuery,
  useEntityDetailsQuery,
  UseEntityDetailsQueryReturn,
} from '@aegis/shared';
import { useCallback } from 'react';
import { SupplierDetailsModel } from '../../model';
import { SUPPLIER_DETAILS_QUERY } from '../graphql/suppliersQueries';

export interface UseSupplierDetailsQueryProps {
  id?: string;
  enabled?: boolean;
}

export const useSupplierDetailsQuery = (
  props: UseSupplierDetailsQueryProps
): UseEntityDetailsQueryReturn<SupplierDetailsModel> => {
  const resultSelector = useCallback(
    (data?: SupplierDetailsQuery) => data?.supplierById as SupplierDetailsModel | undefined,
    []
  );

  return useEntityDetailsQuery({
    ...props,
    query: SUPPLIER_DETAILS_QUERY,
    resultSelector,
  });
};
