import { ArticleFilterInput, ArticlesQuery } from '@aegis/shared';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { gqlClient } from '../../../../shared';
import { ArticleModel } from '../../model';
import { ARTICLES_QUERY, ARTICLES_QUERY_KEY } from '../graphql';

export interface UseArticlesQueryProps {
  pageSize: number;
  searchTerm?: string;
  filters?: ArticleFilterInput;
}

export const useArticlesQuery = ({ pageSize, filters }: UseArticlesQueryProps) => {
  const result = useInfiniteQuery({
    queryKey: ARTICLES_QUERY_KEY({ filters }),
    queryFn: async ({ pageParam }) => {
      return gqlClient.request(ARTICLES_QUERY, {
        first: pageSize,
        after: pageParam ? `${pageParam}` : undefined,
        where: filters,
      });
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage: ArticlesQuery) =>
      lastPage.articles?.pageInfo.hasNextPage ? lastPage.articles?.pageInfo.endCursor : undefined,
    // This ensures data is wiped as soon as you navigate away
    gcTime: 0,
    // Optional: set staleTime to 0 to ensure it always fetches fresh on mount
    staleTime: 0,
    // Optional: Keep the old data on screen while the new search fetches
    // to prevent the UI from jumping to a loading spinner
    placeholderData: (previousData) => previousData,
  });

  const articles = useMemo(() => {
    return (result.data?.pages.flatMap((page) => page.articles?.nodes ?? []) ||
      []) as ArticleModel[];
  }, [result.data]);

  const totalCount = useMemo(() => {
    return result.data?.pages
      ? result.data.pages[result.data.pages.length - 1].articles?.totalCount ?? 0
      : 0;
  }, [result.data]);

  return { ...result, articles, totalCount };
};
