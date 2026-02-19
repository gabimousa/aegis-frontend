import {
  CreateFieldDefinitionInput,
  UpdateFieldDefinitionInput,
  useMutateCache,
  useToast,
} from '@aegis/shared';
import { toGroup } from '@aegis/utils';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { gqlClient } from '../../../../../shared';
import { FieldDefinitionModel } from '../../model';
import {
  CREATE_FIELD_DEFINITION_MUTATION,
  FIELD_DEFINITIONS_QUERY_KEY,
  UPDATE_FIELD_DEFINITION_MUTATION,
} from '../graphql';

export const useSaveFieldDefinition = () => {
  const { upsertInfiniteData, updateInInfiniteData } = useMutateCache<FieldDefinitionModel>();
  const { success, error } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (input: CreateFieldDefinitionInput | UpdateFieldDefinitionInput) => {
      if ('id' in input) {
        const result = await gqlClient.request(UPDATE_FIELD_DEFINITION_MUTATION, { input });
        if (result.updateFieldDefinition.errors?.length) {
          throw toGroup(result.updateFieldDefinition.errors, 'fieldName');
        }
        return result;
      }
      const result = await gqlClient.request(CREATE_FIELD_DEFINITION_MUTATION, { input });
      if (result.createFieldDefinition.errors?.length) {
        throw toGroup(result.createFieldDefinition.errors, 'fieldName');
      }
      return result;
    },
    onSuccess: (data) => {
      if (!data) return;
      success(t('fieldDefinitions.saveFieldDefinitionSuccess'));

      if ('createFieldDefinition' in data) {
        const savedFieldDefinition = data.createFieldDefinition
          .fieldDefinition as FieldDefinitionModel;
        upsertInfiniteData(savedFieldDefinition, FIELD_DEFINITIONS_QUERY_KEY(), 'fieldDefinitions');
      } else {
        const savedFieldDefinition = data.updateFieldDefinition
          .fieldDefinition as FieldDefinitionModel;
        updateInInfiniteData(
          savedFieldDefinition,
          FIELD_DEFINITIONS_QUERY_KEY(),
          'fieldDefinitions',
        );
      }
    },
    onError: () => {
      error(t('fieldDefinitions.saveFieldDefinitionError'));
    },
  });
};
