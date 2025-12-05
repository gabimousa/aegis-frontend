import type { ErrorLike } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useCallback, useState } from 'react';
import { UseRemoveEntityProps } from './useRemoveEntityProps';
import { UseRemoveEntityReturn } from './useRemoveEntityReturn';

export const useRemoveEntity = <M>({
  onEntityRemoved,
  onError,
  mutation,
  mutationResultSelector,
}: UseRemoveEntityProps<M>): UseRemoveEntityReturn => {
  const [removingEntity, setRemovingEntity] = useState(false);
  const [error, setError] = useState<ErrorLike | Error | undefined>(undefined);

  const [removeEntity] = useMutation(mutation, {
    onError: (apolloError) => {
      setError(apolloError);
      onError?.(apolloError);
    },
  });

  const remove = useCallback(
    async (entityId: string): Promise<boolean> => {
      setRemovingEntity(true);
      setError(undefined);

      try {
        const result = await removeEntity({
          variables: { input: { id: entityId } },
        });

        const errors = mutationResultSelector(result.data as M)?.errors;
        if (errors?.length) {
          const errorMessages = errors
            .map((e) => e?.message || 'Unknown error')
            .filter(Boolean)
            .join(', ');
          const error = new Error(`Failed to remove entity: ${errorMessages}`);
          setError(error);
          onError?.(error);
          return false;
        }

        onEntityRemoved?.(entityId);
        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(error);
        onError?.(error);
        return false;
      } finally {
        setRemovingEntity(false);
      }
    },
    [removeEntity, onEntityRemoved, onError, mutationResultSelector]
  );

  return {
    remove,
    removingEntity,
    error,
  };
};
