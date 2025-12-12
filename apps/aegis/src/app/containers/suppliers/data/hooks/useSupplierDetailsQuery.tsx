import { useCallback } from 'react';
import { SupplierDetailsQuery } from '../../../../gql/graphql';
import { useEntityDetailsQuery, UseEntityDetailsQueryReturn } from '../../../../hooks';
import { SupplierDetailsModel } from '../../model/supplierDetails.model';
import { supplierDetailsQuery } from '../graphql/suppliersQueries';

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
    query: supplierDetailsQuery,
    resultSelector,
  });
};
