import { useMutateCache, useToast } from '@aegis/shared';
import { toGroup } from '@aegis/utils';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { gqlClient } from '../../../../../shared';
import { DELETE_FIELD_DEFINITION_MUTATION, FIELD_DEFINITIONS_QUERY_KEY } from '../graphql';

export const useDeleteFieldDefinition = () => {
  const { removeFromInfiniteData } = useMutateCache();
  const { success, error } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await gqlClient.request(DELETE_FIELD_DEFINITION_MUTATION, { input: { id } });
      if (result.deleteFieldDefinition.errors?.length) {
        throw toGroup(result.deleteFieldDefinition.errors, 'fieldName');
      }
      return result;
    },
    onSuccess: (_, id) => {
      success(t('fieldDefinitions.deleteFieldDefinitionSuccess'));
      removeFromInfiniteData(id, FIELD_DEFINITIONS_QUERY_KEY(), 'fieldDefinitions');
    },
    onError: () => {
      error(t('fieldDefinitions.deleteFieldDefinitionError'));
    },
  });
};
