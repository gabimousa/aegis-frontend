import type { ErrorLike } from '@apollo/client';
import { useRemoveEntity } from '@aegis/shared';
import { deactivateSupplierMutation } from '../graphql/suppliersMutations';

export interface UseDeactivateSupplierProps {
  onSupplierDeactivated?: (supplierId: string) => void;
  onError?: (error: ErrorLike | Error) => void;
}

export interface UseDeactivateSupplierReturn {
  deactivate: (supplierId: string) => Promise<boolean>;
  deactivatingSupplier: boolean;
  error?: ErrorLike | Error;
}

export const useDeactivateSupplier = ({
  onSupplierDeactivated,
  onError,
}: UseDeactivateSupplierProps = {}): UseDeactivateSupplierReturn => {
  const { remove, removingEntity, error } = useRemoveEntity({
    onEntityRemoved: onSupplierDeactivated,
    onError,
    mutation: deactivateSupplierMutation,
    mutationResultSelector: (data) => data?.deactivateSupplier,
  });

  return { deactivate: remove, deactivatingSupplier: removingEntity, error };
};
