import { useCallback } from 'react';
import { ArticlesQuery as ArticlesQueryType } from '@aegis/shared';
import { useListQuery } from '@aegis/shared';
import { Connection } from '@aegis/shared';
import { ArticleModel } from '../../model';
import { ArticlesQuery } from '../graphql/articlesQueries';

export interface UseArticlesQueryProps {
  pageSize: number;
}

export const useArticlesQuery = ({ pageSize }: UseArticlesQueryProps) => {
  const connectionSelector = useCallback(
    (data?: ArticlesQueryType) => data?.articles as Connection<ArticleModel>,
    []
  );

  return useListQuery({
    pageSize,
    query: ArticlesQuery,
    connectionSelector,
  });
};
