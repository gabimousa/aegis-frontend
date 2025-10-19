import { useQuery } from '@apollo/client/react';
import { CustomerDetailsQuery } from './customerDetailsQuery';

export const useCustomerDetails = (id: string) => {
  const variables = { id };
  const { data, loading, error } = useQuery(CustomerDetailsQuery, {
    variables,
  });

  return {
    customer: data?.customerById,
    loading,
    error,
  };
};
