import { OperationVariables, TypedDocumentNode } from '@apollo/client';
import { Connection } from './connection';

export interface UseEntitiesQueryProps<Q, T> {
  pageSize: number;
  searchTerm?: string;
  enabled?: boolean;
  query: TypedDocumentNode<Q, OperationVariables>;
  connectionSelector: (data: Q | undefined) => Connection<T> | undefined | null;
}
