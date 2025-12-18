import { ArticlesQuery as ArticlesQueryType, Connection, useListQuery } from '@aegis/shared';
import { ArticleModel } from '../../model';
import { ArticlesQuery } from '../graphql/articlesQueries';

export interface UseArticlesQueryProps {
  pageSize: number;
}
const connectionSelector = (data?: ArticlesQueryType) => data?.articles as Connection<ArticleModel>;

const idSelector = (item: ArticleModel) => item.id;

export const useArticlesQuery = ({ pageSize }: UseArticlesQueryProps) => {
  return useListQuery({
    pageSize,
    query: ArticlesQuery,
    connectionSelector,
    idSelector,
  });
};
