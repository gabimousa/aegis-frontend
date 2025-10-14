import { graphql } from '../../../gql';

export const CustomersQuery = graphql(`
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
