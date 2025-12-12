import { OperationVariables, TypedDocumentNode } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PageInfo } from '../../../gql/graphql';
import { Connection } from '../../../types';
import { useEntityStore } from '../../useEntityStore';

export type UseListQueryProps<Q, T> = {
  pageSize: number;
  query: TypedDocumentNode<Q, OperationVariables>;
  connectionSelector: (data: Q | undefined) => Connection<T> | undefined | null;
};

export type UseListQueryReturn<T> = {
  items: T[];
  totalCount: number;
  loading: boolean;
  error: Error | undefined;
  canLoadMore: boolean;
  getItemById: (id: string) => T | undefined;
  load: () => Promise<T[]>;
  loadMore: () => Promise<T[]>;
  loadById: (id: string) => Promise<T | undefined>;
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
}: UseListQueryProps<Q, T>): UseListQueryReturn<T> => {
  const [listState, setListState] = useState<ListState>({
    totalCount: 0,
    pageInfo: null,
    searchTerm: undefined,
  });

  const { items, getByKey, addOne, addMany, clear, deleteOne } = useEntityStore<T>(
    (item) => item.id
  );

  const { loading, error, refetch } = useQuery(query, {
    skip: true,
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
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

      const { data } = await refetch(variables);
      const connection = connectionSelector(data);
      updateData(connection, updatePageInfo);
      return connection?.nodes ?? [];
    },
    [pageSize, refetch, listState.searchTerm, connectionSelector, updateData]
  );

  const load = useCallback(async () => {
    return await fetchData({ after: null });
  }, [fetchData]);

  const loadMore = useCallback(async () => {
    if (!canLoadMore) return [];

    return await fetchData({ after: listState.pageInfo?.endCursor });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canLoadMore, listState.pageInfo]);

  const loadById = useCallback(
    async (id: string) => {
      const results = await fetchData({ first: 1, where: { id: { eq: id } } }, false);
      return results.length > 0 ? results[0] : undefined;
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
