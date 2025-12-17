import { ErrorLike } from '@apollo/client';

export interface UseEntityDetailsQueryReturn<T> {
  entity?: T;
  loading: boolean;
  error?: ErrorLike;
  refetch: () => void;
}
