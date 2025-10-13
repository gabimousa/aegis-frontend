import { graphql } from '../../gql';

export const SuppliersQuery = graphql(`
  query Suppliers($first: Int, $last: Int, $after: String, $before: String) {
    suppliers(first: $first, last: $last, after: $after, before: $before) {
      edges {
        node {
          id
          code
          name
          website
          email
          phoneNumber
          iban
          bic
        }
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
