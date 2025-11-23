import { useMutation, useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { RegisterCustomerInput, UpdateCustomerDetailsInput } from '../../../../gql/graphql';
import { toGroup } from '../../../../utils/toGroup';
import { CustomerDetailsModel } from '../../model/customerDetails.model';
import {
  registerCustomerMutation,
  updateCustomerDetailsMutation,
} from '../graphql/customersMutations';
import { customerDetailsQuery } from '../graphql/customersQueries';

type useCustomerDetailsDataOptions = {
  id?: string;
  onDataSaved?: (customer: CustomerDetailsModel) => void;
};

export const useCustomerDetailsData = (options: useCustomerDetailsDataOptions) => {
  const { id, onDataSaved } = options;
  const variables = { id: id ?? '' };
  const { data, loading, error } = useQuery(customerDetailsQuery, {
    variables,
    skip: !id || id === 'NEW',
  });
  const [updateCustomerDetails] = useMutation(updateCustomerDetailsMutation);
  const [registerCustomer] = useMutation(registerCustomerMutation);
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
          throw toGroup(updateResult.data.updateCustomerDetails.errors, 'fieldName');
        } else {
          if (updateResult.data) {
            onDataSaved?.(updateResult.data.updateCustomerDetails.customer as CustomerDetailsModel);
          }
        }
      } else {
        const registerResult = await registerCustomer({ variables: { input } });
        if (registerResult.data?.registerCustomer.errors?.length) {
          throw toGroup(registerResult.data.registerCustomer.errors, 'fieldName');
        } else {
          if (registerResult.data) {
            onDataSaved?.(registerResult.data.registerCustomer.customer as CustomerDetailsModel);
          }
        }
      }
      return true;
    } finally {
      setSaving(false);
    }
  };

  return {
    customer: data?.customerById as CustomerDetailsModel | undefined,
    loading,
    error,
    save,
    saving,
  };
};
