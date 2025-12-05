import { ErrorLike, TypedDocumentNode } from '@apollo/client';
import { ApplicationError } from '../../../gql/graphql';

export interface UseSaveEntityProps<T, C, U, CI, UI extends { id: string }> {
  onDataSaved?: (entity: T) => void;
  onError?: (error: ErrorLike | Error) => void;
  createMutation: TypedDocumentNode<C, { input: CI }>;
  updateMutation: TypedDocumentNode<U, { input: UI }>;
  createResultSelector: (
    data?: C
  ) => { errors?: Array<ApplicationError> | null } | undefined | null;
  updateResultSelector: (
    data?: U
  ) => { errors?: Array<ApplicationError> | null } | undefined | null;
  saveResultEntitySelector: (data?: C | U) => T | undefined | null;
}
