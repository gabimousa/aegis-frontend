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
  return useEntityDetailsQuery({
    ...props,
    query: customerDetailsQuery,
    resultSelector: (data) => data?.customerById as CustomerDetailsModel | undefined,
  });
};
