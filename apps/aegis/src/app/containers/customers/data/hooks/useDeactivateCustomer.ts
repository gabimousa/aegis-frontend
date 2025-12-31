import { useMutateCache } from '@aegis/shared';
import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '../../../../shared';
import { CustomerModel } from '../../model';
import { CUSTOMERS_QUERY_KEY, DEACTIVATE_CUSTOMER_MUTATION } from '../graphql';
import { toGroup } from '@aegis/utils';

export const useDeactivateCustomer = () => {
  const { removeFromInfiniteData } = useMutateCache<CustomerModel>();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await gqlClient.request(DEACTIVATE_CUSTOMER_MUTATION, { input: { id } });
      if (result.deactivateCustomer.errors?.length) {
        throw toGroup(result.deactivateCustomer.errors, 'fieldName');
      }
      return result;
    },
    onSuccess: (_, id) => {
      removeFromInfiniteData(id, CUSTOMERS_QUERY_KEY(), 'customers');
    },
  });
};
