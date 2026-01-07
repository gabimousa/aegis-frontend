import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { Connection } from '../../types';

type Page<T> = { [key: string]: Connection<T> };

export const useMutateCache = <T extends { id: string }>() => {
  const queryClient = useQueryClient();

  const add = (connection: Connection<T>, newNode: T) => {
    const result = {
      ...connection,
      nodes: [newNode, ...(connection.nodes ?? [])],
      totalCount: connection.totalCount + 1,
    };
    console.log(connection, result);
    return result;
  };

  const update = (connection: Connection<T>, updatedNode: T) => {
    return {
      ...connection,
      nodes:
        connection.nodes?.map((node) =>
          node.id === updatedNode.id ? { ...node, ...updatedNode } : node,
        ) ?? [],
    };
  };

  const remove = (connection: Connection<T>, id: string) => {
    return {
      ...connection,
      nodes: connection.nodes?.filter((node) => node.id !== id) ?? [],
      totalCount: connection.totalCount - 1,
    };
  };

  const addToInfiniteData = (newNode: T, queryKey: unknown[], connectionKey: string) => {
    queryClient.setQueriesData({ queryKey }, (oldData: InfiniteData<Page<T>>) => {
      if (!oldData || !newNode) return oldData;
      const [firstPage, ...pages] = oldData.pages;
      const newPage = { ...firstPage, [connectionKey]: add(firstPage[connectionKey], newNode) };
      return {
        ...oldData,
        pages: [newPage, ...pages],
      };
    });
  };

  const updateInInfiniteData = (newNode: T, queryKey: unknown[], connectionKey: string) => {
    queryClient.setQueriesData({ queryKey }, (oldData: InfiniteData<Page<T>>) => {
      if (!oldData || !newNode) return oldData;
      const newPages = oldData.pages.map((page) => {
        return { ...page, [connectionKey]: update(page[connectionKey], newNode) };
      });
      return { ...oldData, pages: newPages };
    });
  };

  const upsertInfiniteData = (node: T, queryKey: unknown[], connectionKey: string) => {
    queryClient.setQueriesData({ queryKey }, (oldData: InfiniteData<Page<T>>) => {
      if (!oldData || !node) return oldData;
      const exists = oldData.pages.some((page) =>
        page[connectionKey].nodes?.some((n) => n.id === node.id),
      );

      if (exists) {
        return updateInInfiniteData(node, queryKey, connectionKey);
      } else {
        return addToInfiniteData(node, queryKey, connectionKey);
      }
    });
  };

  const removeFromInfiniteData = (id: string, queryKey: unknown[], connectionKey: string) => {
    queryClient.setQueriesData(
      {
        queryKey,
      },
      (oldData: InfiniteData<Page<T>>) => {
        if (!oldData) return oldData;
        const newPages = oldData.pages.map((page) => {
          return { ...page, [connectionKey]: remove(page[connectionKey], id) };
        });
        return {
          ...oldData,
          pages: newPages,
        };
      },
    );
  };

  return {
    add,
    update,
    remove,
    addToInfiniteData,
    updateInInfiniteData,
    upsertInfiniteData,
    removeFromInfiniteData,
    queryClient,
  };
};
