import { graphql } from '../../../../gql';

export const CustomersQuery = graphql(`
  query customers(
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
        ...CustomerFields
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

export const customerDetailsQuery = graphql(`
  query CustomerDetails($id: ID!) {
    customerById(id: $id) {
      ...CustomerFields
      addresses {
        ...CustomerAddressFields
      }
    }
  }
`);
