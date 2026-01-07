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

export const ARTICLE_DETAILS_FRAGMENT = graphql(`
  fragment ArticleDetailsFields on Article {
    id
    code
    name
    description
    price
    sellingUnit
    suppliers {
      nodes {
        id
        code
        name
      }
    }
  }
`);
