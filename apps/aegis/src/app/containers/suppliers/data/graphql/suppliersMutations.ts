import { graphql } from '@aegis/shared';

export const REGISTER_SUPPLIER_MUTATION = graphql(`
  mutation registerSupplier($input: RegisterSupplierInput!) {
    registerSupplier(input: $input) {
      supplier {
        ...SupplierFields
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

export const UPDATE_SUPPLIER_DETAILS_MUTATION = graphql(`
  mutation updateSupplierDetails($input: UpdateSupplierDetailsInput!) {
    updateSupplierDetails(input: $input) {
      supplier {
        ...SupplierFields
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

export const DEACTIVATE_SUPPLIER_MUTATION = graphql(`
  mutation deactivateSupplier($input: DeactivateSupplierInput!) {
    deactivateSupplier(input: $input) {
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
