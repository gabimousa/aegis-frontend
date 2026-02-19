import { graphql } from '@aegis/shared';

const FIELD_DEFINITIONS_QUERY_BASE_KEY = 'FIELD_DEFINITIONS';
export const FIELD_DEFINITIONS_QUERY_KEY = (args?: { [key: string]: unknown }) => {
  return args ? [FIELD_DEFINITIONS_QUERY_BASE_KEY, args] : [FIELD_DEFINITIONS_QUERY_BASE_KEY];
};

const FIELD_DEFINITION_DETAILS_QUERY_BASE_KEY = 'FIELD_DEFINITION_DETAILS';
export const FIELD_DEFINITION_DETAILS_QUERY_KEY = (id?: string) => [
  FIELD_DEFINITION_DETAILS_QUERY_BASE_KEY,
  id,
];

export const FIELD_DEFINITIONS_QUERY = graphql(`
  query fieldDefinitions(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $where: FieldDefinitionFilterInput
    $order: [FieldDefinitionSortInput!]
  ) {
    fieldDefinitions(
      first: $first
      last: $last
      after: $after
      before: $before
      where: $where
      order: $order
    ) {
      nodes {
        ...FieldDefinitionFields
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

export const FIELD_DEFINITION_DETAILS_QUERY = graphql(`
  query FieldDefinitionDetails($id: ID!) {
    fieldDefinitionById(id: $id) {
      ...FieldDefinitionFields
    }
  }
`);
