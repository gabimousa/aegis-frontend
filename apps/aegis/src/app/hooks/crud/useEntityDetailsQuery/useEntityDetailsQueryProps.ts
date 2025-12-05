import { TypedDocumentNode } from '@apollo/client';

export interface UseEntityDetailsQueryProps<Q, T> {
  id?: string;
  enabled?: boolean;
  query: TypedDocumentNode<Q, { id: string }>;
  resultSelector: (data: Q | undefined) => T | undefined;
}
