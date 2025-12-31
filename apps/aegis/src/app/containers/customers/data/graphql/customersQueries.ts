import { graphql } from '@aegis/shared';

const CUSTOMERS_QUERY_BASE_KEY = 'CUSTOMER_LIST';
export const CUSTOMERS_QUERY_KEY = (args?: { [key: string]: unknown }) => {
  return args ? [CUSTOMERS_QUERY_BASE_KEY, args] : [CUSTOMERS_QUERY_BASE_KEY];
};
const CUSTOMER_DETAILS_QUERY_BASE_KEY = 'CUSTOMER_DETAILS';
export const CUSTOMER_DETAILS_QUERY_KEY = (id?: string) => [CUSTOMER_DETAILS_QUERY_BASE_KEY, id];

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
