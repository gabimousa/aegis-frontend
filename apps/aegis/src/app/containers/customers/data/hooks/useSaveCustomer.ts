import {
  Customer,
  RegisterCustomerInput,
  UpdateCustomerDetailsInput,
  useMutateCache,
} from '@aegis/shared';
import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '../../../../shared';
import {
  CUSTOMERS_QUERY_KEY,
  REGISTER_CUSTOMER_MUTATION,
  UPDATE_CUSTOMER_DETAILS_MUTATION,
} from '../graphql';

export const useSaveCustomer = () => {
  const { addToInfiniteData, updateInInfiniteData } = useMutateCache<Customer>();

  return useMutation({
    mutationFn: async (input: RegisterCustomerInput | UpdateCustomerDetailsInput) => {
      if ('id' in input) {
        return gqlClient.request(UPDATE_CUSTOMER_DETAILS_MUTATION, { input });
      }
      return gqlClient.request(REGISTER_CUSTOMER_MUTATION, { input });
    },
    onSuccess: (data) => {
      if (!data) return;

      if ('registerCustomer' in data) {
        const savedCustomer = data.registerCustomer.customer as Customer;
        addToInfiniteData(savedCustomer, CUSTOMERS_QUERY_KEY(), 'customers');
      } else {
        const savedCustomer = data.updateCustomerDetails.customer as Customer;
        updateInInfiniteData(savedCustomer, CUSTOMERS_QUERY_KEY(), 'customers');
      }
    },
  });
};
