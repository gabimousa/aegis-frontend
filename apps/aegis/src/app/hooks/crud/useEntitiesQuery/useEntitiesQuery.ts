import { OperationVariables } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PageInfo } from '../../../gql/graphql';
import { toRecord } from '../../../utils/toMap';
import { usePagination } from '../../usePagination';
import { UseEntitiesQueryProps } from './useEntitiesQueryProps';
import { UseEntitiesQueryReturn } from './useEntitiesQueryReturn';

export const useEntitiesQuery = <Q, T extends { id: string }>({
  pageSize,
  enabled = true,
  query,
  connectionSelector,
}: UseEntitiesQueryProps<Q, T>): UseEntitiesQueryReturn<T> => {
  const pagination = usePagination({ pageSize });
  const [entityLookup, setEntityLookup] = useState<Record<string, T>>({});
  const [orderedIds, setOrderedIds] = useState<string[]>([]);
  const entities = useMemo(
    () => orderedIds.map((id) => entityLookup[id]),
    [entityLookup, orderedIds]
  );
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>();
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const controllerRef = useRef<AbortController | null>(null);

  const variables = useMemo((): OperationVariables => {
    const baseVariables: OperationVariables = { ...pagination.variables };

    if (searchTerm?.trim()) {
      baseVariables.where = {
        name: { contains: searchTerm.trim() },
      };
    }

    return baseVariables;
  }, [pagination.variables, searchTerm]);

  const { data, loading, error } = useQuery(query, {
    variables,
    skip: !enabled,
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });

  const { refetch: refetchSingleEntity, error: singleEntityError } = useQuery(query, {
    variables,
    skip: true,
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });

  const queryError = useMemo(() => {
    return error || singleEntityError;
  }, [error, singleEntityError]);

  const fetchSingleEntity = useCallback(
    async (id: string) => {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();
      console.log(`🔍 Fetching single entity with ID: ${id}`);
      const result = await refetchSingleEntity({
        first: 1,
        where: { id: { eq: id } },
      });
      const connection = connectionSelector(result.data);
      const newEntities = connection?.nodes ?? [];
      if (newEntities.length > 0) {
        const [entity] = newEntities;
        setEntityLookup((prevEntityLookup) => {
          if (prevEntityLookup[entity.id]) {
            return { ...prevEntityLookup, [entity.id]: entity };
          } else {
            setOrderedIds((prevOrderedIds) => Array.from(new Set([...prevOrderedIds, entity.id])));
            return { ...prevEntityLookup, [entity.id]: entity };
          }
        });
      }
      return newEntities.length > 0 ? newEntities[0] : undefined;
    },
    [refetchSingleEntity, connectionSelector]
  );

  const removeLocalEntity = useCallback((id: string) => {
    setEntityLookup((prevEntityMap) => {
      if (prevEntityMap[id]) {
        const newEntityMap = { ...prevEntityMap };
        delete newEntityMap[id];
        return newEntityMap;
      }
      return prevEntityMap;
    });
    setOrderedIds((prevOrderedIds) => prevOrderedIds.filter((entityId) => entityId !== id));
  }, []);

  useEffect(() => {
    if (data) {
      const connection = connectionSelector(data);
      const newEntities = connection?.nodes ?? [];
      setEntityLookup((prevEntityLookup) => toRecord(newEntities, 'id', prevEntityLookup));
      setOrderedIds((prevOrderedIds) => {
        const existingIdsSet = new Set(prevOrderedIds);
        newEntities.forEach((entity) => existingIdsSet.add(entity.id));
        return Array.from(existingIdsSet);
      });
      setPageInfo(connection?.pageInfo);
      setTotalCount(connection?.totalCount ?? 0);
    }
  }, [data, connectionSelector]);

  return {
    ...pagination,
    entities,
    pageInfo,
    totalCount,
    loading,
    error: queryError,
    searchTerm,
    fetchSingleEntity,
    removeLocalEntity,
    setSearchTerm,
  };
};
