import { Customer, useMutateCache } from '@aegis/shared';
import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '../../../../shared';
import { CUSTOMERS_QUERY_KEY } from '../graphql';
import { DEACTIVATE_CUSTOMER_MUTATION } from '../graphql/customersMutations';
export const useDeactivateCustomer = () => {
  const { removeFromInfiniteData } = useMutateCache<Customer>();

  return useMutation({
    mutationFn: async (id: string) =>
      gqlClient.request(DEACTIVATE_CUSTOMER_MUTATION, { input: { id } }),
    onSuccess: (_, id) => {
      removeFromInfiniteData(id, CUSTOMERS_QUERY_KEY(), 'customers');
    },
  });
};
