import {
  ArticleDetailsQuery,
  useEntityDetailsQuery,
  UseEntityDetailsQueryReturn,
} from '@aegis/shared';
import { useCallback } from 'react';
import { ArticleModel } from '../../model';
import { articleDetailsQuery } from '../graphql/articlesQueries';

export interface UseArticleDetailsQueryProps {
  id?: string;
  enabled?: boolean;
}

export const useArticleDetailsQuery = (
  props: UseArticleDetailsQueryProps
): UseEntityDetailsQueryReturn<ArticleModel> => {
  const resultSelector = useCallback(
    (data?: ArticleDetailsQuery) => data?.articleById as ArticleModel | undefined,
    []
  );

  return useEntityDetailsQuery({
    ...props,
    query: articleDetailsQuery,
    resultSelector,
  });
};
