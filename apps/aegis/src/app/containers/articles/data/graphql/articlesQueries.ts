import { graphql } from '@aegis/shared';

const ARTICLES_QUERY_BASE_KEY = 'ARTICLE_LIST';
export const ARTICLES_QUERY_KEY = (args?: { [key: string]: unknown }) => {
  return args ? [ARTICLES_QUERY_BASE_KEY, args] : [ARTICLES_QUERY_BASE_KEY];
};
const ARTICLE_DETAILS_QUERY_BASE_KEY = 'ARTICLE_DETAILS';
export const ARTICLE_DETAILS_QUERY_KEY = (id?: string) => [ARTICLE_DETAILS_QUERY_BASE_KEY, id];

export const ARTICLES_QUERY = graphql(`
  query articles(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $where: ArticleFilterInput
    $order: [ArticleSortInput!]
  ) {
    articles(
      first: $first
      last: $last
      after: $after
      before: $before
      where: $where
      order: $order
    ) {
      nodes {
        ...ArticleFields
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`);

export const ARTICLE_DETAILS_QUERY = graphql(`
  query ArticleDetails($id: ID!) {
    articleById(id: $id) {
      ...ArticleFields
    }
  }
`);
