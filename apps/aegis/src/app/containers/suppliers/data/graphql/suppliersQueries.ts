import { graphql } from '@aegis/shared';
const SUPPLIERS_QUERY_BASE_KEY = 'SUPPLIER_LIST';
export const SUPPLIERS_QUERY_KEY = (args?: { [key: string]: unknown }) => {
  return args ? [SUPPLIERS_QUERY_BASE_KEY, args] : [SUPPLIERS_QUERY_BASE_KEY];
};
const SUPPLIER_DETAILS_QUERY_BASE_KEY = 'SUPPLIER_DETAILS';
export const SUPPLIER_DETAILS_QUERY_KEY = (id?: string) => [SUPPLIER_DETAILS_QUERY_BASE_KEY, id];

export const SUPPLIERS_QUERY = graphql(`
  query suppliers(
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
        ...SupplierFields
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

export const SUPPLIER_DETAILS_QUERY = graphql(`
  query SupplierDetails($id: ID!) {
    supplierById(id: $id) {
      ...SupplierFields
      addresses {
        ...SupplierAddressFields
      }
    }
  }
`);
