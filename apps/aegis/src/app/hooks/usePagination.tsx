import { useCallback, useState } from 'react';
import { PageInfo } from '../gql/graphql';

export interface PaginationState {
  first?: number | null;
  last?: number | null;
  before?: string | null;
  after?: string | null;
}

export interface UsePaginationProps {
  pageSize: number;
  initialVariables?: PaginationState;
}

export interface UsePaginationReturn {
  variables: PaginationState;
  canGoNext: (pageInfo?: PageInfo) => boolean;
  canGoPrevious: (pageInfo?: PageInfo) => boolean;
  nextPage: (pageInfo: PageInfo) => void;
  prevPage: (pageInfo: PageInfo) => void;
  resetPagination: () => void;
}

export const usePagination = ({
  pageSize,
  initialVariables,
}: UsePaginationProps): UsePaginationReturn => {
  const [variables, setVariables] = useState<PaginationState>(
    initialVariables || { first: pageSize }
  );

  const canGoNext = useCallback((pageInfo?: PageInfo) => {
    return pageInfo?.hasNextPage ?? false;
  }, []);

  const canGoPrevious = useCallback((pageInfo?: PageInfo) => {
    return pageInfo?.hasPreviousPage ?? false;
  }, []);

  const nextPage = useCallback(
    (pageInfo: PageInfo) => {
      if (pageInfo.hasNextPage) {
        setVariables({
          first: pageSize,
          last: null,
          before: null,
          after: pageInfo.endCursor,
        });
      }
    },
    [pageSize]
  );

  const prevPage = useCallback(
    (pageInfo: PageInfo) => {
      if (pageInfo.hasPreviousPage) {
        setVariables({
          first: null,
          last: pageSize,
          before: pageInfo.startCursor,
          after: null,
        });
      }
    },
    [pageSize]
  );

  const resetPagination = useCallback(() => {
    setVariables({ first: pageSize });
  }, [pageSize]);

  return {
    variables,
    canGoNext,
    canGoPrevious,
    nextPage,
    prevPage,
    resetPagination,
  };
};
