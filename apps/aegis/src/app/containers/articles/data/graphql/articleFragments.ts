import { graphql } from '@aegis/shared';

export const ARTICLE_FRAGMENT = graphql(`
  fragment ArticleFields on Article {
    id
    code
    name
    description
    price
    sellingUnit
  }
`);
