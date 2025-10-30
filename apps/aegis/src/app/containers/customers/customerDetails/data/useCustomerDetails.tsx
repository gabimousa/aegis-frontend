import { useMutation, useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import {
  ApplicationError,
  CustomerAddressesFieldsFragment,
  CustomerDetailsFieldsFragment,
  RegisterCustomerInput,
  UpdateCustomerDetailsInput,
} from '../../../../gql/graphql';
import {
  registerCustomerMutation,
  updateCustomerDetailsMutation,
} from './customerDetailsMutations';
import { CustomerDetailsQuery } from './customerDetailsQueries';

type Customer = CustomerDetailsFieldsFragment & CustomerAddressesFieldsFragment;

export const useCustomerDetails = (id: string) => {
  const variables = { id };
  const { data, loading, error } = useQuery(CustomerDetailsQuery, {
    variables,
    skip: id === 'NEW',
  });

  const [customer, setCustomer] = useState<Customer | null>(null);
  useEffect(() => {
    if (data?.customerById) {
      setCustomer(data.customerById as Customer);
    }
  }, [data]);

  const [updateCustomerDetails] = useMutation(updateCustomerDetailsMutation);
  const [registerCustomer] = useMutation(registerCustomerMutation);
  const [saveError, setSaveError] = useState<ApplicationError | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async (
    input: RegisterCustomerInput | UpdateCustomerDetailsInput
  ): Promise<boolean> => {
    setSaving(true);
    try {
      if ('id' in input) {
        const updateResult = await updateCustomerDetails({
          variables: { input },
        });

        if (updateResult.data?.updateCustomerDetails.errors?.length) {
          setSaveError(updateResult.data.updateCustomerDetails.errors[0]);
        } else {
          setSaveError(null);
          setCustomer(updateResult.data?.updateCustomerDetails.customer as Customer);
        }
        return !updateResult.data?.updateCustomerDetails.errors?.length;
      } else {
        const registerResult = await registerCustomer({ variables: { input } });
        if (registerResult.data?.registerCustomer.errors?.length) {
          setSaveError(registerResult.data.registerCustomer.errors[0]);
        } else {
          setSaveError(null);
          setCustomer(registerResult.data?.registerCustomer.customer as Customer);
        }
        return !registerResult.data?.registerCustomer.errors?.length;
      }
    } finally {
      setSaving(false);
    }
  };

  return {
    customer,
    loading,
    error,
    saveError,
    save,
    saving,
  };
};
