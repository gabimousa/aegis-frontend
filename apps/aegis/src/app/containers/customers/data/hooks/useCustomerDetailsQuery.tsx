import { useCallback } from 'react';
import { CustomerDetailsQuery } from '../../../../gql/graphql';
import { useEntityDetailsQuery, UseEntityDetailsQueryReturn } from '../../../../hooks';
import { CustomerDetailsModel } from '../../model/customerDetails.model';
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
