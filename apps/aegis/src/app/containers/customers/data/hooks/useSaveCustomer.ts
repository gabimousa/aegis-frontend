import { RegisterCustomerInput, UpdateCustomerDetailsInput, useMutateCache } from '@aegis/shared';
import { toGroup } from '@aegis/utils';
import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '../../../../shared';
import { CustomerModel } from '../../model';
import {
  CUSTOMERS_QUERY_KEY,
  REGISTER_CUSTOMER_MUTATION,
  UPDATE_CUSTOMER_DETAILS_MUTATION,
} from '../graphql';

export const useSaveCustomer = () => {
  const { upsertInfiniteData, updateInInfiniteData } = useMutateCache<CustomerModel>();

  return useMutation({
    mutationFn: async (input: RegisterCustomerInput | UpdateCustomerDetailsInput) => {
      if ('id' in input) {
        const result = await gqlClient.request(UPDATE_CUSTOMER_DETAILS_MUTATION, { input });
        if (result.updateCustomerDetails.errors?.length) {
          throw toGroup(result.updateCustomerDetails.errors, 'fieldName');
        }
        return result;
      }
      const result = await gqlClient.request(REGISTER_CUSTOMER_MUTATION, { input });
      if (result.registerCustomer.errors?.length) {
        throw toGroup(result.registerCustomer.errors, 'fieldName');
      }
      return result;
    },
    onSuccess: (data) => {
      if (!data) return;

      if ('registerCustomer' in data) {
        const savedCustomer = data.registerCustomer.customer as CustomerModel;
        upsertInfiniteData(savedCustomer, CUSTOMERS_QUERY_KEY(), 'customers');
      } else {
        const savedCustomer = data.updateCustomerDetails.customer as CustomerModel;
        updateInInfiniteData(savedCustomer, CUSTOMERS_QUERY_KEY(), 'customers');
      }
    },
  });
};
