import { graphql } from '@aegis/shared';

export const CREATE_FIELD_DEFINITION_MUTATION = graphql(`
  mutation createFieldDefinition($input: CreateFieldDefinitionInput!) {
    createFieldDefinition(input: $input) {
      fieldDefinition {
        ...FieldDefinitionFields
      }
      errors {
        ... on ApplicationError {
          code
          description
          type
          fieldName
          message
        }
      }
    }
  }
`);

export const UPDATE_FIELD_DEFINITION_MUTATION = graphql(`
  mutation updateFieldDefinition($input: UpdateFieldDefinitionInput!) {
    updateFieldDefinition(input: $input) {
      fieldDefinition {
        ...FieldDefinitionFields
      }
      errors {
        ... on ApplicationError {
          code
          description
          type
          fieldName
          message
        }
      }
    }
  }
`);

export const DELETE_FIELD_DEFINITION_MUTATION = graphql(`
  mutation deleteFieldDefinition($input: DeleteFieldDefinitionInput!) {
    deleteFieldDefinition(input: $input) {
      boolean
      errors {
        ... on ApplicationError {
          code
          description
          type
          fieldName
          message
        }
      }
    }
  }
`);
