import type { ErrorLike } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useCallback, useState } from 'react';
import { toGroup } from '../../../utils/toGroup';
import { UseSaveEntityProps } from './useSaveEntityProps';
import { UseSaveEntityReturn } from './useSaveEntityReturn';

export const useSaveEntity = <T, C, U, CI extends object, UI extends { id: string }>({
  onDataSaved,
  onError,
  updateMutation,
  createMutation,
  updateResultSelector,
  createResultSelector,
  saveResultEntitySelector,
}: UseSaveEntityProps<T, C, U, CI, UI>): UseSaveEntityReturn<CI | UI> => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<ErrorLike | Error | undefined>(undefined);

  const [updateEntityDetails] = useMutation(updateMutation, {
    onError: (apolloError) => {
      setError(apolloError);
      onError?.(apolloError);
    },
  });

  const [createEntity] = useMutation(createMutation, {
    onError: (apolloError) => {
      setError(apolloError);
      onError?.(apolloError);
    },
  });

  const save = useCallback(
    async <T extends CI | UI>(input: T): Promise<boolean> => {
      setSaving(true);
      setError(undefined);

      try {
        if ('id' in input) {
          // Update existing entity
          const updateResult = await updateEntityDetails({
            variables: { input: input as UI },
          });

          const updateResults = updateResultSelector(updateResult.data as U);
          const errors = updateResults?.errors;
          if (errors?.length) {
            throw toGroup(errors, 'fieldName');
          } else {
            const entity = saveResultEntitySelector(updateResult.data as C);
            if (entity) {
              onDataSaved?.(entity);
            }
          }
        } else {
          // Register new entity
          const registerResult = await createEntity({
            variables: { input: input as CI },
          });

          const errors = createResultSelector(registerResult.data as C)?.errors;
          if (errors?.length) {
            throw toGroup(errors, 'fieldName');
          } else {
            const entity = saveResultEntitySelector(registerResult.data);
            if (entity) {
              onDataSaved?.(entity);
            }
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
    [
      updateEntityDetails,
      createEntity,
      onDataSaved,
      onError,
      updateResultSelector,
      createResultSelector,
      saveResultEntitySelector,
    ]
  );

  return {
    save,
    saving,
    error,
  };
};
