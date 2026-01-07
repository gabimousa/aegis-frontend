import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { gqlClient } from '../../../../shared';
import { ArticleDetailsModel, ArticleSupplierModel } from '../../model';
import { ARTICLE_DETAILS_QUERY, ARTICLE_DETAILS_QUERY_KEY } from '../graphql';

export interface UseArticleDetailsQueryProps {
  id?: string;
}

export const useArticleDetailsQuery = ({ id }: UseArticleDetailsQueryProps) => {
  const result = useQuery({
    queryKey: ARTICLE_DETAILS_QUERY_KEY(id),
    queryFn: async () =>
      gqlClient.request(ARTICLE_DETAILS_QUERY, {
        id: id ?? '',
      }),
    enabled: !!id,
    // This ensures data is wiped as soon as you navigate away
    gcTime: 0,
    // Optional: set staleTime to 0 to ensure it always fetches fresh on mount
    staleTime: 0,
  });

  const article = useMemo(() => {
    return result.data?.articleById as ArticleDetailsModel | undefined;
  }, [result.data]);

  const suppliers = useMemo(() => {
    return result.data?.articleById?.suppliers?.nodes ?? ([] as ArticleSupplierModel[]);
  }, [result.data]);

  return { ...result, data: article, suppliers };
};
