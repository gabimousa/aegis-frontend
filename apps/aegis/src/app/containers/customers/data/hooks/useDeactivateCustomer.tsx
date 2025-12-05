import type { ErrorLike } from '@apollo/client';
import { useRemoveEntity } from '../../../../hooks';
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
  const { remove, removingEntity, error } = useRemoveEntity({
    onEntityRemoved: onCustomerDeactivated,
    onError,
    mutation: deactivateCustomerMutation,
    mutationResultSelector: (data) => data?.deactivateCustomer,
  });

  return { deactivate: remove, deactivatingCustomer: removingEntity, error };
};
