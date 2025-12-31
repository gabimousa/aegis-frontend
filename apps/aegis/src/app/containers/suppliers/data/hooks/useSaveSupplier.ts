import { RegisterSupplierInput, UpdateSupplierDetailsInput, useMutateCache } from '@aegis/shared';
import { toGroup } from '@aegis/utils';
import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '../../../../shared';
import { SupplierModel } from '../../model';
import {
  REGISTER_SUPPLIER_MUTATION,
  SUPPLIERS_QUERY_KEY,
  UPDATE_SUPPLIER_DETAILS_MUTATION,
} from '../graphql';

export const useSaveSupplier = () => {
  const { upsertInfiniteData, updateInInfiniteData } = useMutateCache<SupplierModel>();
  return useMutation({
    mutationFn: async (input: RegisterSupplierInput | UpdateSupplierDetailsInput) => {
      if ('id' in input) {
        const result = await gqlClient.request(UPDATE_SUPPLIER_DETAILS_MUTATION, { input });
        if (result.updateSupplierDetails.errors?.length) {
          throw toGroup(result.updateSupplierDetails.errors, 'fieldName');
        }
        return result;
      }
      const result = await gqlClient.request(REGISTER_SUPPLIER_MUTATION, { input });
      if (result.registerSupplier.errors?.length) {
        throw toGroup(result.registerSupplier.errors, 'fieldName');
      }
      return result;
    },
    onSuccess: (data) => {
      if (!data) return;

      if ('registerSupplier' in data) {
        const savedSupplier = data.registerSupplier.supplier as SupplierModel;
        upsertInfiniteData(savedSupplier, SUPPLIERS_QUERY_KEY(), 'suppliers');
      } else {
        const savedSupplier = data.updateSupplierDetails.supplier as SupplierModel;
        updateInInfiniteData(savedSupplier, SUPPLIERS_QUERY_KEY(), 'suppliers');
      }
    },
  });
};
