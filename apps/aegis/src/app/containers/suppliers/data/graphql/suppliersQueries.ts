import { graphql } from '@aegis/shared';

export const SuppliersQuery = graphql(`
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

export const supplierDetailsQuery = graphql(`
  query SupplierDetails($id: ID!) {
    supplierById(id: $id) {
      ...SupplierFields
      addresses {
        ...SupplierAddressFields
      }
    }
  }
`);
