import { graphql } from '../../../gql';

export const SuppliersQuery = graphql(`
  query Suppliers(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $where: SupplierFilterInput
    $order: [SupplierSortInput!]
  ) {
    suppliers(
      first: $first
      last: $last
      after: $after
      before: $before
      where: $where
      order: $order
    ) {
      nodes {
        id
        code
        name
        website
        email
        phoneNumber
        iban
        bic
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
