import { useMutateCache } from '@aegis/shared';
import { toGroup } from '@aegis/utils';
import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '../../../../shared';
import { SupplierModel } from '../../model';
import { DEACTIVATE_SUPPLIER_MUTATION, SUPPLIERS_QUERY_KEY } from '../graphql';

export const useDeactivateSupplier = () => {
  const { removeFromInfiniteData } = useMutateCache<SupplierModel>();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await gqlClient.request(DEACTIVATE_SUPPLIER_MUTATION, { input: { id } });
      if (result.deactivateSupplier.errors?.length) {
        throw toGroup(result.deactivateSupplier.errors, 'fieldName');
      }
      return result;
    },
    onSuccess: (_, id) => {
      removeFromInfiniteData(id, SUPPLIERS_QUERY_KEY(), 'suppliers');
    },
  });
};
