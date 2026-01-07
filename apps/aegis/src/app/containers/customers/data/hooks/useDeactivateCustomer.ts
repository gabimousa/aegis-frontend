import { useMutateCache, useToast } from '@aegis/shared';
import { toGroup } from '@aegis/utils';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { gqlClient } from '../../../../shared';
import { CustomerModel } from '../../model';
import { CUSTOMERS_QUERY_KEY, DEACTIVATE_CUSTOMER_MUTATION } from '../graphql';

export const useDeactivateCustomer = () => {
  const { removeFromInfiniteData } = useMutateCache<CustomerModel>();
  const { success, error } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await gqlClient.request(DEACTIVATE_CUSTOMER_MUTATION, { input: { id } });
      if (result.deactivateCustomer.errors?.length) {
        throw toGroup(result.deactivateCustomer.errors, 'fieldName');
      }
      return result;
    },
    onSuccess: (_, id) => {
      success(t('customers.deactivateCustomerSuccess'));
      removeFromInfiniteData(id, CUSTOMERS_QUERY_KEY(), 'customers');
    },
    onError: () => {
      error(t('customers.deactivateCustomerError'));
    },
  });
};
