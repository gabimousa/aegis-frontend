import { OperationVariables, TypedDocumentNode } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PageInfo } from '../../../gql/graphql';
import { Connection } from '../../../types';
import { useEntityStore } from '../../useEntityStore';

export type UseListQueryProps<Q, T> = {
  pageSize: number;
  query: TypedDocumentNode<Q, OperationVariables>;
  connectionSelector: (data: Q | undefined) => Connection<T> | undefined | null;
  idSelector: (item: T) => string;
};

export type UseListQueryReturn<T> = {
  items: T[];
  totalCount: number;
  loading: boolean;
  error: Error | undefined;
  canLoadMore: boolean;
  getItemById: (id: string) => T | undefined;
  load: () => void;
  loadMore: () => void;
  loadById: (id: string) => void;
  addOne: (item: T) => void;
  addMany: (items: T[]) => void;
  deleteOne: (id: string) => void;
  clear: () => void;
  searchValue: string | undefined;
  setSearchValue: (searchValue?: string) => void;
};

type ListState = {
  searchTerm?: string;
  totalCount: number;
  pageInfo: PageInfo | null;
};

export const useListQuery = <Q, T extends { id: string }>({
  pageSize,
  query,
  connectionSelector,
  idSelector,
}: UseListQueryProps<Q, T>): UseListQueryReturn<T> => {
  const [listState, setListState] = useState<ListState>({
    totalCount: 0,
    pageInfo: null,
    searchTerm: undefined,
  });

  const { items, getByKey, addOne, addMany, clear, deleteOne } = useEntityStore<T>(idSelector);

  const [executeQuery, { loading, error }] = useLazyQuery(query, {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const canLoadMore = useMemo(() => listState.pageInfo?.hasNextPage ?? true, [listState.pageInfo]);

  const updateData = useCallback(
    (connection?: Connection<T> | null, updatePageInfo = true) => {
      addMany(connection?.nodes ?? []);
      updatePageInfo &&
        setListState((prev) => ({
          ...prev,
          pageInfo: connection?.pageInfo ?? null,
          totalCount: connection?.totalCount ?? 0,
        }));
    },
    [addMany]
  );

  const fetchData = useCallback(
    async (vars?: OperationVariables, updatePageInfo = true) => {
      const variables: OperationVariables = {
        first: pageSize,
        where: listState.searchTerm ? { name: { contains: listState.searchTerm } } : undefined,
        ...vars,
      };

      const { data } = await executeQuery({ variables });
      const connection = connectionSelector(data);
      updateData(connection, updatePageInfo);
    },
    [pageSize, executeQuery, listState.searchTerm, connectionSelector, updateData]
  );

  const load = useCallback(() => {
    return fetchData({ after: null });
  }, [fetchData]);

  const loadMore = useCallback(() => {
    if (!canLoadMore) return [];

    return fetchData({ after: listState.pageInfo?.endCursor });
  }, [canLoadMore, listState.pageInfo?.endCursor, fetchData]);

  const loadById = useCallback(
    (id: string) => {
      fetchData({ first: 1, where: { id: { eq: id } } }, false);
    },
    [fetchData]
  );

  const getItemById = useCallback(
    (id: string): T | undefined => {
      return getByKey(id);
    },
    [getByKey]
  );

  const setSearchTerm = useCallback(
    (searchValue?: string) => {
      clear();
      setListState((prev) => ({
        ...prev,
        pageInfo: null,
        totalCount: 0,
        searchTerm: searchValue,
      }));
    },
    [clear]
  );

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listState.searchTerm]);

  return {
    items,
    totalCount: listState.totalCount,
    loading,
    error,
    canLoadMore,
    getItemById,
    load,
    loadMore,
    loadById,
    addOne,
    addMany,
    deleteOne,
    clear,
    searchValue: listState.searchTerm,
    setSearchValue: setSearchTerm,
  };
};
