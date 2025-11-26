import type { ErrorLike } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useCallback, useState } from 'react';
import { deactivateCustomerMutation } from '../graphql/customersMutations';

export interface UseDeactivateCustomerProps {
  onCustomerDeactivated?: (customerId: string) => void;
  onError?: (error: ErrorLike | Error) => void;
}

export interface UseDeactivateCustomerReturn {
  deactivate: (customerId: string) => Promise<boolean>;
  deactivatingCustomer: boolean;
  error?: ErrorLike | Error;
}

export const useDeactivateCustomer = ({
  onCustomerDeactivated,
  onError,
}: UseDeactivateCustomerProps = {}): UseDeactivateCustomerReturn => {
  const [deactivatingCustomer, setDeactivatingCustomer] = useState(false);
  const [error, setError] = useState<ErrorLike | Error | undefined>(undefined);

  const [deactivateCustomer] = useMutation(deactivateCustomerMutation, {
    onError: (apolloError) => {
      setError(apolloError);
      onError?.(apolloError);
    },
  });

  const deactivate = useCallback(
    async (customerId: string): Promise<boolean> => {
      setDeactivatingCustomer(true);
      setError(undefined);

      try {
        const result = await deactivateCustomer({
          variables: { input: { id: customerId } },
        });

        if (result.data?.deactivateCustomer.errors?.length) {
          const errors = result.data.deactivateCustomer.errors;
          const errorMessages = errors
            .map((e) => e?.message || 'Unknown error')
            .filter(Boolean)
            .join(', ');
          const error = new Error(`Failed to deactivate customer: ${errorMessages}`);
          setError(error);
          onError?.(error);
          return false;
        }

        onCustomerDeactivated?.(customerId);
        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(error);
        onError?.(error);
        return false;
      } finally {
        setDeactivatingCustomer(false);
      }
    },
    [deactivateCustomer, onCustomerDeactivated, onError]
  );

  return {
    deactivate,
    deactivatingCustomer,
    error,
  };
};
