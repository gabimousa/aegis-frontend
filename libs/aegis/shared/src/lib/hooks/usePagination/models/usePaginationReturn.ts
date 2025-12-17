import { OperationVariables } from '@apollo/client';
import { PageInfo } from '../../../gql/graphql';

export interface UsePaginationReturn {
  variables: OperationVariables;
  canLoadMore: (pageInfo?: PageInfo) => boolean;
  loadMore: (pageInfo: PageInfo) => void;
  resetPagination: () => void;
}
