import { OperationVariables } from '@apollo/client';
import { useCallback, useState } from 'react';
import { PageInfo } from '../../gql/graphql';
import { UsePaginationProps } from './models/usePaginationProps';
import { UsePaginationReturn } from './models/usePaginationReturn';

export const usePagination = ({
  pageSize,
  initialVariables,
}: UsePaginationProps): UsePaginationReturn => {
  const [variables, setVariables] = useState<OperationVariables>(
    initialVariables || { first: pageSize }
  );

  const hasMore = useCallback((pageInfo?: PageInfo) => {
    return pageInfo?.hasNextPage ?? false;
  }, []);

  const loadMore = useCallback(
    (pageInfo: PageInfo) => {
      if (hasMore(pageInfo)) {
        setVariables({
          first: pageSize,
          last: null,
          before: null,
          after: pageInfo.endCursor,
        });
      }
    },
    [pageSize, hasMore]
  );

  const resetPagination = useCallback(() => {
    setVariables({ first: pageSize });
  }, [pageSize]);

  return {
    variables,
    canLoadMore: hasMore,
    loadMore,
    resetPagination,
  };
};
