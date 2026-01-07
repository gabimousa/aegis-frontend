import { useMutateCache, useToast } from '@aegis/shared';
import { toGroup } from '@aegis/utils';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { gqlClient } from '../../../../shared';
import { SupplierModel } from '../../model';
import { DEACTIVATE_SUPPLIER_MUTATION, SUPPLIERS_QUERY_KEY } from '../graphql';

export const useDeactivateSupplier = () => {
  const { removeFromInfiniteData } = useMutateCache<SupplierModel>();
  const { success, error } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await gqlClient.request(DEACTIVATE_SUPPLIER_MUTATION, { input: { id } });
      if (result.deactivateSupplier.errors?.length) {
        throw toGroup(result.deactivateSupplier.errors, 'fieldName');
      }
      return result;
    },
    onSuccess: (_, id) => {
      success(t('suppliers.deactivateSupplierSuccess'));
      removeFromInfiniteData(id, SUPPLIERS_QUERY_KEY(), 'suppliers');
    },
    onError: () => {
      error(t('suppliers.deactivateSupplierError'));
    },
  });
};
