import { graphql } from '@aegis/shared';

export const FIELD_DEFINITION_FRAGMENT = graphql(`
  fragment FieldDefinitionFields on FieldDefinition {
    id
    key
    label
    description
    type
    configuration
  }
`);
