import { graphql } from '@aegis/shared';

export const ArticlesQuery = graphql(`
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

export const articleDetailsQuery = graphql(`
  query ArticleDetails($id: ID!) {
    articleById(id: $id) {
      ...ArticleFields
    }
  }
`);
