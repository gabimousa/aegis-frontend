import type { ErrorLike } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useCallback, useState } from 'react';
import { RegisterCustomerInput, UpdateCustomerDetailsInput } from '../../../../gql/graphql';
import { toGroup } from '../../../../utils/toGroup';
import { CustomerDetailsModel } from '../../model/customerDetails.model';
import {
  registerCustomerMutation,
  updateCustomerDetailsMutation,
} from '../graphql/customersMutations';

export interface UseSaveCustomerProps {
  onDataSaved?: (customer: CustomerDetailsModel) => void;
  onError?: (error: ErrorLike | Error) => void;
}

export interface UseSaveCustomerReturn {
  save: (input: RegisterCustomerInput | UpdateCustomerDetailsInput) => Promise<boolean>;
  saving: boolean;
  error?: ErrorLike | Error;
}

export const useSaveCustomer = ({
  onDataSaved,
  onError,
}: UseSaveCustomerProps = {}): UseSaveCustomerReturn => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<ErrorLike | Error | undefined>(undefined);

  const [updateCustomerDetails] = useMutation(updateCustomerDetailsMutation, {
    onError: (apolloError) => {
      setError(apolloError);
      onError?.(apolloError);
    },
  });

  const [registerCustomer] = useMutation(registerCustomerMutation, {
    onError: (apolloError) => {
      setError(apolloError);
      onError?.(apolloError);
    },
  });

  const save = useCallback(
    async (input: RegisterCustomerInput | UpdateCustomerDetailsInput): Promise<boolean> => {
      setSaving(true);
      setError(undefined);

      try {
        if ('id' in input) {
          // Update existing customer
          const updateResult = await updateCustomerDetails({
            variables: { input },
          });

          if (updateResult.data?.updateCustomerDetails.errors?.length) {
            throw toGroup(updateResult.data.updateCustomerDetails.errors, 'fieldName');
          } else if (updateResult.data?.updateCustomerDetails.customer) {
            onDataSaved?.(updateResult.data.updateCustomerDetails.customer as CustomerDetailsModel);
          }
        } else {
          // Register new customer
          const registerResult = await registerCustomer({
            variables: { input },
          });

          if (registerResult.data?.registerCustomer.errors?.length) {
            throw toGroup(registerResult.data.registerCustomer.errors, 'fieldName');
          } else if (registerResult.data?.registerCustomer.customer) {
            onDataSaved?.(registerResult.data.registerCustomer.customer as CustomerDetailsModel);
          }
        }

        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(error);
        onError?.(error);
        return false;
      } finally {
        setSaving(false);
      }
    },
    [updateCustomerDetails, registerCustomer, onDataSaved, onError]
  );

  return {
    save,
    saving,
    error,
  };
};
