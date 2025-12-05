import { ErrorLike } from '@apollo/client';

export interface UseRemoveEntityReturn {
  remove: (entityId: string) => Promise<boolean>;
  removingEntity: boolean;
  error?: ErrorLike | Error;
}
