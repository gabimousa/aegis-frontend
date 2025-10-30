import { graphql } from '../../../../gql';

export const CustomerListQuery = graphql(`
  query Customers(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $where: CustomerFilterInput
    $order: [CustomerSortInput!]
  ) {
    customers(
      first: $first
      last: $last
      after: $after
      before: $before
      where: $where
      order: $order
    ) {
      nodes {
        ...CustomerListFields
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
