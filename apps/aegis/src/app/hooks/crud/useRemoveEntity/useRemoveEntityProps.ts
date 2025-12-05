import { ErrorLike, OperationVariables, TypedDocumentNode } from '@apollo/client';
import { ApplicationError } from '../../../gql/graphql';

export interface UseRemoveEntityProps<M> {
  onEntityRemoved?: (entityId: string) => void;
  onError?: (error: ErrorLike | Error) => void;
  mutation: TypedDocumentNode<M, { input: { id: string } } & OperationVariables>;
  mutationResultSelector: (
    data: M
  ) => { errors?: Array<ApplicationError> | null } | undefined | null;
}
