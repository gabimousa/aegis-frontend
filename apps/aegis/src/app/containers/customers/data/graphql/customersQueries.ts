import { graphql } from '@aegis/shared';

export const CUSTOMERS_QUERY_KEY = (args?: { [key: string]: unknown }) => {
  return args ? ['CUSTOMERS', args] : ['CUSTOMERS'];
};
export const CUSTOMER_DETAILS_QUERY_KEY = (id?: string) => ['CUSTOMER_DETAILS', id];

export const CUSTOMERS_QUERY = graphql(`
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

export const CUSTOMER_DETAILS_QUERY = graphql(`
  query CustomerDetails($id: ID!) {
    customerById(id: $id) {
      ...CustomerFields
      addresses {
        ...CustomerAddressFields
      }
    }
  }
`);
