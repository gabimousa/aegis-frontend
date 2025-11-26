import type { ErrorLike } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { CustomerDetailsModel } from '../../model/customerDetails.model';
import { customerDetailsQuery } from '../graphql/customersQueries';

export interface UseCustomerDetailsQueryProps {
  id?: string;
  enabled?: boolean;
}

export interface UseCustomerDetailsQueryReturn {
  customer?: CustomerDetailsModel;
  loading: boolean;
  error?: ErrorLike;
  refetch: () => void;
}

export const useCustomerDetailsQuery = ({
  id,
  enabled = true,
}: UseCustomerDetailsQueryProps): UseCustomerDetailsQueryReturn => {
  const variables = { id: id ?? '' };
  const shouldSkip = !enabled || !id || id === 'NEW';

  const { data, loading, error, refetch } = useQuery(customerDetailsQuery, {
    variables,
    skip: shouldSkip,
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });

  return {
    customer: data?.customerById as CustomerDetailsModel | undefined,
    loading,
    error,
    refetch,
  };
};
