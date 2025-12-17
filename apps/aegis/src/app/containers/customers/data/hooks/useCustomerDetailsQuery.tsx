import { useEntityDetailsQuery, UseEntityDetailsQueryReturn } from '@aegis/shared';
import { useCallback } from 'react';
import { CustomerDetailsQuery } from '@aegis/shared';
import { CustomerDetailsModel } from '../../model';
import { customerDetailsQuery } from '../graphql/customersQueries';

export interface UseCustomerDetailsQueryProps {
  id?: string;
  enabled?: boolean;
}

export const useCustomerDetailsQuery = (
  props: UseCustomerDetailsQueryProps
): UseEntityDetailsQueryReturn<CustomerDetailsModel> => {
  const resultSelector = useCallback(
    (data?: CustomerDetailsQuery) => data?.customerById as CustomerDetailsModel | undefined,
    []
  );

  return useEntityDetailsQuery({
    ...props,
    query: customerDetailsQuery,
    resultSelector,
  });
};
