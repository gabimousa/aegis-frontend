import { ErrorLike } from '@apollo/client';

export interface UseSaveEntityReturn<T> {
  save: (input: T) => Promise<boolean>;
  saving: boolean;
  error?: ErrorLike | Error;
}
