import { useMutation, useQuery } from '@apollo/client/react';
import { useState } from 'react';
import {
  ApplicationError,
  RegisterCustomerInput,
  UpdateCustomerDetailsInput,
} from '../../../../gql/graphql';
import { CustomerDetails } from '../../model/customerDetails';
import {
  registerCustomerMutation,
  updateCustomerDetailsMutation,
} from '../graphql/customersMutations';
import { customerDetailsQuery } from '../graphql/customersQueries';
import { toGroup } from '../../../../utils/toGroup';

type useCustomerDetailsDataOptions = {
  id?: string;
  onDataSaved?: (customer: CustomerDetails) => void;
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
  const [saveErrors, setSaveErrors] = useState<
    Record<keyof ApplicationError, ApplicationError[]> | undefined
  >(undefined);
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
          setSaveErrors(toGroup(updateResult.data.updateCustomerDetails.errors, 'code'));
        } else {
          if (updateResult.data) {
            onDataSaved?.(updateResult.data.updateCustomerDetails.customer as CustomerDetails);
            setSaveErrors(undefined);
          }
        }
        return !updateResult.data?.updateCustomerDetails.errors?.length;
      } else {
        const registerResult = await registerCustomer({ variables: { input } });
        if (registerResult.data?.registerCustomer.errors?.length) {
          setSaveErrors(toGroup(registerResult.data.registerCustomer.errors, 'code'));
        } else {
          if (registerResult.data) {
            onDataSaved?.(registerResult.data.registerCustomer.customer as CustomerDetails);
            setSaveErrors(undefined);
          }
        }
        return !registerResult.data?.registerCustomer.errors?.length;
      }
    } finally {
      setSaving(false);
    }
  };

  return {
    customer: data?.customerById as CustomerDetails | undefined,
    loading,
    error,
    saveErrors,
    save,
    saving,
  };
};
