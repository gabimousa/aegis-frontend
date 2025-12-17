import { graphql } from '@aegis/shared';

export const articleFragment = graphql(`
  fragment ArticleFields on Article {
    id
    code
    name
    description
    price
    sellingUnit
  }
`);
